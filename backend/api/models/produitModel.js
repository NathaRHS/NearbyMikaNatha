const pool = require('../config/db');

const ProduitModel = {
    // Récupérer tous les produits
    getAll: async () => {
        const result = await pool.query('SELECT * FROM produit ORDER BY id ASC');
        return result.rows;
    },

    // Récupérer un produit par son id
    getById: async (id) => {
        const result = await pool.query('SELECT * FROM produit WHERE id = $1', [id]);
        return result.rows[0];
    },

    // Créer un nouveau produit
    create: async (nom) => {
        const result = await pool.query(
            'INSERT INTO produit (nom) VALUES ($1) RETURNING *',
            [nom]
        );
        return result.rows[0];
    },

    // Mettre à jour un produit
    update: async (id, nom) => {
        const result = await pool.query(
            'UPDATE produit SET nom = $1 WHERE id = $2 RETURNING *',
            [nom, id]
        );
        return result.rows[0];
    },

    // Supprimer un produit
    delete: async (id) => {
        const result = await pool.query(
            'DELETE FROM produit WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    }
};

module.exports = ProduitModel;
