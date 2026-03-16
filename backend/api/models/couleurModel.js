const pool = require('../config/db');

const CouleurModel = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM couleur ORDER BY id ASC');
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query('SELECT * FROM couleur WHERE id = $1', [id]);
        return result.rows[0];
    },

    create: async (nom) => {
        const result = await pool.query(
            'INSERT INTO couleur (nom) VALUES ($1) RETURNING *',
            [nom]
        );
        return result.rows[0];
    },

    update: async (id, nom) => {
        const result = await pool.query(
            'UPDATE couleur SET nom = $1 WHERE id = $2 RETURNING *',
            [nom, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query('DELETE FROM couleur WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = CouleurModel;
