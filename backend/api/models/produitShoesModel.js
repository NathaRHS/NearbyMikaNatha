const pool = require('../config/db');

const ProduitShoesModel = {
    // GetAll avec JOIN pour récupérer les entités liées (comme JPA)
    getAll: async () => {
        const result = await pool.query(`
            SELECT 
                ps.id,
                ps.pointure,
                json_build_object('id', p.id, 'nom', p.nom) AS produit,
                json_build_object('id', c.id, 'nom', c.nom) AS couleur
            FROM produit_shoes ps
            LEFT JOIN produit p ON ps.produit_id = p.id
            LEFT JOIN couleur c ON ps.idcouleur = c.id
            ORDER BY ps.id ASC
        `);
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query(`
            SELECT 
                ps.id,
                ps.pointure,
                json_build_object('id', p.id, 'nom', p.nom) AS produit,
                json_build_object('id', c.id, 'nom', c.nom) AS couleur
            FROM produit_shoes ps
            LEFT JOIN produit p ON ps.produit_id = p.id
            LEFT JOIN couleur c ON ps.idcouleur = c.id
            WHERE ps.id = $1
        `, [id]);
        return result.rows[0];
    },

    create: async (produit_id, idcouleur, pointure) => {
        const result = await pool.query(
            'INSERT INTO produit_shoes (produit_id, idcouleur, pointure) VALUES ($1, $2, $3) RETURNING *',
            [produit_id, idcouleur, pointure]
        );
        return result.rows[0];
    },

    update: async (id, produit_id, idcouleur, pointure) => {
        const result = await pool.query(
            'UPDATE produit_shoes SET produit_id = $1, idcouleur = $2, pointure = $3 WHERE id = $4 RETURNING *',
            [produit_id, idcouleur, pointure, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query('DELETE FROM produit_shoes WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = ProduitShoesModel;
