const pool = require('../config/db');

const ProduitModel = {
    getAll: async () => {
        const result = await pool.query(`
            SELECT
                p.id,
                p.nom,
                p.description,
                p.prix,
                p.iddescription_image,
                CASE
                    WHEN di.id IS NULL THEN NULL
                    ELSE json_build_object('id', di.id, 'url', di.url)
                END AS description_image
            FROM produit p
            LEFT JOIN description_image di ON p.iddescription_image = di.id
            ORDER BY p.id ASC
        `);
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query(`
            SELECT
                p.id,
                p.nom,
                p.description,
                p.prix,
                p.iddescription_image,
                CASE
                    WHEN di.id IS NULL THEN NULL
                    ELSE json_build_object('id', di.id, 'url', di.url)
                END AS description_image
            FROM produit p
            LEFT JOIN description_image di ON p.iddescription_image = di.id
            WHERE p.id = $1
        `, [id]);
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
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const result = await client.query(
                'DELETE FROM produit WHERE id = $1 RETURNING *',
                [id]
            );

            const produit = result.rows[0];

            if (!produit) {
                await client.query('ROLLBACK');
                return null;
            }

            if (produit.iddescription_image) {
                await client.query(
                    'DELETE FROM description_image WHERE id = $1',
                    [produit.iddescription_image]
                );
            }

            await client.query('COMMIT');
            return produit;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
};

module.exports = ProduitModel;
