const AdminAuditLogModel = require('../models/adminAuditLogModel');
const AdminSessionModel = require('../models/adminSessionModel');
const AdminUserModel = require('../models/adminUserModel');
const { verifyPassword } = require('../utils/password');
const { generateSessionToken, getSessionExpiryDate, hashSessionToken } = require('../utils/session');

const MAX_FAILED_ATTEMPTS = 5;
const ACCOUNT_LOCK_MINUTES = 15;

function getClientIp(req) {
    const forwardedFor = req.headers['x-forwarded-for'];

    if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
        return forwardedFor.split(',')[0].trim();
    }

    return req.ip || req.socket?.remoteAddress || null;
}

function getUserAgent(req) {
    return req.headers['user-agent'] || null;
}

function getLockDate() {
    const lockDate = new Date();
    lockDate.setMinutes(lockDate.getMinutes() + ACCOUNT_LOCK_MINUTES);
    return lockDate;
}

function sanitizeAdminUser(adminUser) {
    if (!adminUser) {
        return null;
    }

    return {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        is_active: adminUser.is_active,
        last_login_at: adminUser.last_login_at
    };
}

const AuthService = {
    login: async (email, password, req) => {
        if (!email || !password) {
            throw { status: 400, message: 'Email et mot de passe requis' };
        }

        const normalizedEmail = email.trim().toLowerCase();
        const adminUser = await AdminUserModel.getByEmail(normalizedEmail);
        const ipAddress = getClientIp(req);
        const userAgent = getUserAgent(req);

        if (!adminUser) {
            await AdminAuditLogModel.create({
                action: 'login',
                resource: 'auth',
                status: 'failed',
                ipAddress,
                userAgent,
                details: { reason: 'unknown_email', email: normalizedEmail }
            });

            throw { status: 401, message: 'Identifiants invalides' };
        }

        if (!adminUser.is_active) {
            await AdminAuditLogModel.create({
                adminUserId: adminUser.id,
                action: 'login',
                resource: 'auth',
                status: 'failed',
                ipAddress,
                userAgent,
                details: { reason: 'inactive_account' }
            });

            throw { status: 403, message: 'Compte admin desactive' };
        }

        if (adminUser.locked_until && new Date(adminUser.locked_until) > new Date()) {
            throw { status: 423, message: 'Compte temporairement verrouille' };
        }

        const passwordIsValid = verifyPassword(password, adminUser.password_hash);

        if (!passwordIsValid) {
            const nextFailedAttempts = Number(adminUser.failed_attempts || 0) + 1;
            const lockedUntil = nextFailedAttempts >= MAX_FAILED_ATTEMPTS ? getLockDate() : null;

            await AdminUserModel.recordFailedLogin(adminUser.id, lockedUntil);
            await AdminAuditLogModel.create({
                adminUserId: adminUser.id,
                action: 'login',
                resource: 'auth',
                status: 'failed',
                ipAddress,
                userAgent,
                details: {
                    reason: 'bad_password',
                    failed_attempts: nextFailedAttempts,
                    locked_until: lockedUntil ? lockedUntil.toISOString() : null
                }
            });

            throw { status: 401, message: 'Identifiants invalides' };
        }

        const sessionToken = generateSessionToken();
        const sessionTokenHash = hashSessionToken(sessionToken);
        const expiresAt = getSessionExpiryDate();

        const safeAdminUser = await AdminUserModel.resetLoginState(adminUser.id);

        await AdminSessionModel.create({
            adminUserId: adminUser.id,
            sessionTokenHash,
            ipAddress,
            userAgent,
            expiresAt
        });

        await AdminAuditLogModel.create({
            adminUserId: adminUser.id,
            action: 'login',
            resource: 'auth',
            status: 'success',
            ipAddress,
            userAgent,
            details: { expires_at: expiresAt.toISOString() }
        });

        return {
            adminUser: sanitizeAdminUser(safeAdminUser),
            sessionToken
        };
    },

    getAuthenticatedAdmin: async (sessionToken) => {
        if (!sessionToken) {
            return null;
        }

        const session = await AdminSessionModel.getActiveWithUserByTokenHash(hashSessionToken(sessionToken));

        if (!session || !session.is_active) {
            return null;
        }

        await AdminSessionModel.touch(session.id);

        return {
            sessionId: session.id,
            adminUserId: session.admin_user_id,
            adminUser: sanitizeAdminUser({
                id: session.admin_user_id,
                email: session.email,
                role: session.role,
                is_active: session.is_active,
                last_login_at: session.last_login_at
            })
        };
    },

    logout: async (sessionToken, req, adminUser = null) => {
        if (!sessionToken) {
            return;
        }

        const revokedSession = await AdminSessionModel.revokeByTokenHash(hashSessionToken(sessionToken));

        await AdminAuditLogModel.create({
            adminUserId: adminUser?.id || revokedSession?.admin_user_id || null,
            action: 'logout',
            resource: 'auth',
            status: 'success',
            ipAddress: getClientIp(req),
            userAgent: getUserAgent(req),
            details: null
        });
    }
};

module.exports = AuthService;
