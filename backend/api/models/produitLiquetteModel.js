const pool = require('../config/db');

const ProduitLiquetteModel = {
    // GetAll avec JOIN pour récupérer les entités liées (comme JPA)
    getAll: async () => {
        const result = await pool.query(`
            SELECT 
                pl.id,
                pl.taille,
                json_build_object('id', p.id, 'nom', p.nom) AS produit,
                json_build_object('id', c.id, 'nom', c.nom) AS couleur,
                json_build_object('id', tm.id, 'nom', tm.nom) AS type_manche
            FROM produit_liquette pl
            LEFT JOIN produit p ON pl.produit_id = p.id
            LEFT JOIN couleur c ON pl.idcouleur = c.id
            LEFT JOIN type_manche tm ON pl.idtype_manche = tm.id
            ORDER BY pl.id ASC
        `);
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query(`
            SELECT 
                pl.id,
                pl.taille,
                json_build_object('id', p.id, 'nom', p.nom) AS produit,
                json_build_object('id', c.id, 'nom', c.nom) AS couleur,
                json_build_object('id', tm.id, 'nom', tm.nom) AS type_manche
            FROM produit_liquette pl
            LEFT JOIN produit p ON pl.produit_id = p.id
            LEFT JOIN couleur c ON pl.idcouleur = c.id
            LEFT JOIN type_manche tm ON pl.idtype_manche = tm.id
            WHERE pl.id = $1
        `, [id]);
        return result.rows[0];
    },

    create: async (produit_id, idcouleur, idtype_manche, taille) => {
        const result = await pool.query(
            'INSERT INTO produit_liquette (produit_id, idcouleur, idtype_manche, taille) VALUES ($1, $2, $3, $4) RETURNING *',
            [produit_id, idcouleur, idtype_manche, taille]
        );
        return result.rows[0];
    },

    update: async (id, produit_id, idcouleur, idtype_manche, taille) => {
        const result = await pool.query(
            'UPDATE produit_liquette SET produit_id = $1, idcouleur = $2, idtype_manche = $3, taille = $4 WHERE id = $5 RETURNING *',
            [produit_id, idcouleur, idtype_manche, taille, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query('DELETE FROM produit_liquette WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = ProduitLiquetteModel;
