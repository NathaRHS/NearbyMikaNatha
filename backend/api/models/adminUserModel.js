const pool = require('../config/db');

const AdminUserModel = {
    create: async ({ email, passwordHash, role = 'admin' }) => {
        const result = await pool.query(
            `INSERT INTO admin_user (email, password_hash, role)
             VALUES ($1, $2, $3)
             RETURNING id, email, role, is_active, failed_attempts, locked_until, last_login_at, created_at, updated_at`,
            [email, passwordHash, role]
        );

        return result.rows[0];
    },

    getByEmail: async (email) => {
        const result = await pool.query(
            `SELECT id, email, password_hash, role, is_active, failed_attempts, locked_until, last_login_at, created_at, updated_at
             FROM admin_user
             WHERE LOWER(email) = LOWER($1)`,
            [email]
        );

        return result.rows[0];
    },

    getSafeById: async (id) => {
        const result = await pool.query(
            `SELECT id, email, role, is_active, failed_attempts, locked_until, last_login_at, created_at, updated_at
             FROM admin_user
             WHERE id = $1`,
            [id]
        );

        return result.rows[0];
    },

    recordFailedLogin: async (id, lockedUntil) => {
        const result = await pool.query(
            `UPDATE admin_user
             SET failed_attempts = failed_attempts + 1,
                 locked_until = COALESCE($2, locked_until)
             WHERE id = $1
             RETURNING id, email, role, is_active, failed_attempts, locked_until, last_login_at, created_at, updated_at`,
            [id, lockedUntil]
        );

        return result.rows[0];
    },

    resetLoginState: async (id) => {
        const result = await pool.query(
            `UPDATE admin_user
             SET failed_attempts = 0,
                 locked_until = NULL,
                 last_login_at = CURRENT_TIMESTAMP
             WHERE id = $1
             RETURNING id, email, role, is_active, failed_attempts, locked_until, last_login_at, created_at, updated_at`,
            [id]
        );

        return result.rows[0];
    }
};

module.exports = AdminUserModel;
