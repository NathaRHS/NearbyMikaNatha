const pool = require('../config/db');

function mapRow(row) {
    if (!row) {
        return null;
    }

    return {
        id: row.id,
        url: row.url,
        produit: row.produit_id
            ? {
                id: row.produit_id,
                nom: row.produit_nom
            }
            : null
    };
}

const DescriptionImageModel = {
    getAll: async () => {
        const result = await pool.query(`
            SELECT
                di.id,
                di.url,
                p.id AS produit_id,
                p.nom AS produit_nom
            FROM description_image di
            LEFT JOIN produit p ON p.iddescription_image = di.id
            ORDER BY di.id ASC
        `);

        return result.rows.map(mapRow);
    },

    getById: async (id) => {
        const result = await pool.query(`
            SELECT
                di.id,
                di.url,
                p.id AS produit_id,
                p.nom AS produit_nom
            FROM description_image di
            LEFT JOIN produit p ON p.iddescription_image = di.id
            WHERE di.id = $1
        `, [id]);

        return mapRow(result.rows[0]);
    },

    getByProductId: async (produitId) => {
        const result = await pool.query(`
            SELECT
                di.id,
                di.url,
                p.id AS produit_id,
                p.nom AS produit_nom
            FROM produit p
            LEFT JOIN description_image di ON p.iddescription_image = di.id
            WHERE p.id = $1
        `, [produitId]);

        const row = result.rows[0];

        if (!row || !row.id) {
            return null;
        }

        return mapRow(row);
    },

    create: async (produitId, url) => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const productResult = await client.query(
                'SELECT id, nom, iddescription_image FROM produit WHERE id = $1 FOR UPDATE',
                [produitId]
            );

            const produit = productResult.rows[0];

            if (!produit) {
                await client.query('ROLLBACK');
                return null;
            }

            const imageResult = await client.query(
                'INSERT INTO description_image (url) VALUES ($1) RETURNING id, url',
                [url]
            );

            const image = imageResult.rows[0];

            await client.query(
                'UPDATE produit SET iddescription_image = $1 WHERE id = $2',
                [image.id, produitId]
            );

            if (produit.iddescription_image) {
                await client.query(
                    'DELETE FROM description_image WHERE id = $1',
                    [produit.iddescription_image]
                );
            }

            await client.query('COMMIT');

            return {
                ...image,
                produit: {
                    id: produit.id,
                    nom: produit.nom
                }
            };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    },

    update: async (id, produitId, url) => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const imageResult = await client.query(
                'UPDATE description_image SET url = $1 WHERE id = $2 RETURNING id, url',
                [url, id]
            );

            const image = imageResult.rows[0];

            if (!image) {
                await client.query('ROLLBACK');
                return null;
            }

            const productResult = await client.query(
                'SELECT id, nom FROM produit WHERE id = $1 FOR UPDATE',
                [produitId]
            );

            const produit = productResult.rows[0];

            if (!produit) {
                await client.query('ROLLBACK');
                return null;
            }

            await client.query(
                'UPDATE produit SET iddescription_image = NULL WHERE iddescription_image = $1 AND id <> $2',
                [id, produitId]
            );

            await client.query(
                'UPDATE produit SET iddescription_image = $1 WHERE id = $2',
                [id, produitId]
            );

            await client.query('COMMIT');

            return {
                ...image,
                produit: {
                    id: produit.id,
                    nom: produit.nom
                }
            };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    },

    delete: async (id) => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const productResult = await client.query(
                'SELECT id, nom FROM produit WHERE iddescription_image = $1 FOR UPDATE',
                [id]
            );

            const produit = productResult.rows[0] ?? null;

            if (produit) {
                await client.query(
                    'UPDATE produit SET iddescription_image = NULL WHERE id = $1',
                    [produit.id]
                );
            }

            const deleteResult = await client.query(
                'DELETE FROM description_image WHERE id = $1 RETURNING id, url',
                [id]
            );

            const image = deleteResult.rows[0];

            if (!image) {
                await client.query('ROLLBACK');
                return null;
            }

            await client.query('COMMIT');

            return {
                ...image,
                produit
            };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
};

module.exports = DescriptionImageModel;
