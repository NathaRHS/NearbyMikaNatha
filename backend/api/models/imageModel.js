const pool = require('../config/db');

const ImageModel = {
    getAll: async () => {
        const result = await pool.query(`
            SELECT 
                i.id,
                i.url,
                json_build_object('id', p.id, 'nom', p.nom) AS produit
            FROM image i
            LEFT JOIN produit p ON i.idproduit = p.id
            ORDER BY i.id ASC
        `);
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query(`
            SELECT 
                i.id,
                i.url,
                json_build_object('id', p.id, 'nom', p.nom) AS produit
            FROM image i
            LEFT JOIN produit p ON i.idproduit = p.id
            WHERE i.id = $1
        `, [id]);
        return result.rows[0];
    },

    create: async (idproduit, url) => {
        const result = await pool.query(
            'INSERT INTO image (idproduit, url) VALUES ($1, $2) RETURNING *',
            [idproduit, url]
        );
        return result.rows[0];
    },

    update: async (id, idproduit, url) => {
        const result = await pool.query(
            'UPDATE image SET idproduit = $1, url = $2 WHERE id = $3 RETURNING *',
            [idproduit, url, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query('DELETE FROM image WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = ImageModel;
