const pool = require('../config/db');

const TypeMancheModel = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM type_manche ORDER BY id ASC');
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query('SELECT * FROM type_manche WHERE id = $1', [id]);
        return result.rows[0];
    },

    create: async (nom) => {
        const result = await pool.query(
            'INSERT INTO type_manche (nom) VALUES ($1) RETURNING *',
            [nom]
        );
        return result.rows[0];
    },

    update: async (id, nom) => {
        const result = await pool.query(
            'UPDATE type_manche SET nom = $1 WHERE id = $2 RETURNING *',
            [nom, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query('DELETE FROM type_manche WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = TypeMancheModel;
