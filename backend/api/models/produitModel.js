const pool = require('../config/db');

const ProduitModel = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM produit ORDER BY id ASC');
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query('SELECT * FROM produit WHERE id = $1', [id]);
        return result.rows[0];
    },

    create: async (nom, description, prix) => {
        const result = await pool.query(
            'INSERT INTO produit (nom, description, prix) VALUES ($1, $2, $3) RETURNING *',
            [nom, description, prix]
        );
        return result.rows[0];
    },

    update: async (id, nom, description, prix) => {
        const result = await pool.query(
            'UPDATE produit SET nom = $1, description = $2, prix = $3 WHERE id = $4 RETURNING *',
            [nom, description, prix, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query(
            'DELETE FROM produit WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    }
};

module.exports = ProduitModel;
