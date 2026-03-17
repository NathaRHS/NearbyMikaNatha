const AuthService = require('../services/authService');
const { parseCookies, SESSION_COOKIE_NAME } = require('../utils/session');

async function attachAdminSession(req, res, next) {
    try {
        const cookies = parseCookies(req.headers.cookie);
        const sessionToken = cookies[SESSION_COOKIE_NAME] || null;

        req.sessionToken = sessionToken;
        req.adminUser = null;

        if (!sessionToken) {
            return next();
        }

        const authContext = await AuthService.getAuthenticatedAdmin(sessionToken);

        if (authContext) {
            req.adminUser = authContext.adminUser;
            req.adminSessionId = authContext.sessionId;
        }

        return next();
    } catch (error) {
        return res.status(500).json({ message: 'Erreur authentification' });
    }
}

function requireAuth(req, res, next) {
    if (!req.adminUser) {
        return res.status(401).json({ message: 'Authentification requise' });
    }

    return next();
}

function requireAdmin(req, res, next) {
    if (!req.adminUser) {
        return res.status(401).json({ message: 'Authentification requise' });
    }

    if (!['admin', 'super_admin'].includes(req.adminUser.role)) {
        return res.status(403).json({ message: 'Acces refuse' });
    }

    return next();
}

module.exports = {
    attachAdminSession,
    requireAdmin,
    requireAuth
};
