const crypto = require('crypto');

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'nearby_admin_session';
const SESSION_TTL_HOURS = Number(process.env.SESSION_TTL_HOURS || 12);

function generateSessionToken() {
    return crypto.randomBytes(48).toString('hex');
}

function hashSessionToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
}

function getSessionExpiryDate() {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + SESSION_TTL_HOURS);
    return expiresAt;
}

function parseCookies(headerValue) {
    if (!headerValue) {
        return {};
    }

    return headerValue.split(';').reduce((cookies, part) => {
        const separatorIndex = part.indexOf('=');

        if (separatorIndex === -1) {
            return cookies;
        }

        const key = part.slice(0, separatorIndex).trim();
        const value = decodeURIComponent(part.slice(separatorIndex + 1).trim());

        if (key) {
            cookies[key] = value;
        }

        return cookies;
    }, {});
}

function buildSessionCookie(token) {
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    const maxAge = SESSION_TTL_HOURS * 60 * 60;

    return `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`;
}

function buildClearedSessionCookie() {
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}

module.exports = {
    SESSION_COOKIE_NAME,
    buildClearedSessionCookie,
    buildSessionCookie,
    generateSessionToken,
    getSessionExpiryDate,
    hashSessionToken,
    parseCookies
};
