const pool = require('../config/db');

const AdminSessionModel = {
    create: async ({ adminUserId, sessionTokenHash, ipAddress, userAgent, expiresAt }) => {
        const result = await pool.query(
            `INSERT INTO admin_session (admin_user_id, session_token_hash, ip_address, user_agent, expires_at, last_seen_at)
             VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
             RETURNING *`,
            [adminUserId, sessionTokenHash, ipAddress, userAgent, expiresAt]
        );

        return result.rows[0];
    },

    getActiveWithUserByTokenHash: async (sessionTokenHash) => {
        const result = await pool.query(
            `SELECT
                s.id,
                s.admin_user_id,
                s.session_token_hash,
                s.ip_address,
                s.user_agent,
                s.expires_at,
                s.revoked_at,
                s.created_at,
                s.last_seen_at,
                u.email,
                u.role,
                u.is_active,
                u.failed_attempts,
                u.locked_until,
                u.last_login_at
             FROM admin_session s
             JOIN admin_user u ON u.id = s.admin_user_id
             WHERE s.session_token_hash = $1
               AND s.revoked_at IS NULL
               AND s.expires_at > CURRENT_TIMESTAMP
             LIMIT 1`,
            [sessionTokenHash]
        );

        return result.rows[0];
    },

    touch: async (id) => {
        await pool.query(
            'UPDATE admin_session SET last_seen_at = CURRENT_TIMESTAMP WHERE id = $1',
            [id]
        );
    },

    revokeByTokenHash: async (sessionTokenHash) => {
        const result = await pool.query(
            `UPDATE admin_session
             SET revoked_at = CURRENT_TIMESTAMP
             WHERE session_token_hash = $1
               AND revoked_at IS NULL
             RETURNING *`,
            [sessionTokenHash]
        );

        return result.rows[0];
    }
};

module.exports = AdminSessionModel;
