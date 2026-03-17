const AuthService = require('../services/authService');
const { buildClearedSessionCookie, buildSessionCookie } = require('../utils/session');

const AuthController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const { adminUser, sessionToken } = await AuthService.login(email, password, req);

            res.setHeader('Set-Cookie', buildSessionCookie(sessionToken));
            res.status(200).json({ adminUser });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    logout: async (req, res) => {
        try {
            await AuthService.logout(req.sessionToken, req, req.adminUser || null);
            res.setHeader('Set-Cookie', buildClearedSessionCookie());
            res.status(200).json({ message: 'Session admin fermee' });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    me: async (req, res) => {
        if (!req.adminUser) {
            return res.status(401).json({ message: 'Authentification requise' });
        }

        return res.status(200).json({ adminUser: req.adminUser });
    }
};

module.exports = AuthController;
