const pool = require('../config/db');

const CommandeInfoModel = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM commandeinfo ORDER BY id ASC');
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query('SELECT * FROM commandeinfo WHERE id = $1', [id]);
        return result.rows[0];
    },

    create: async (nom, prenom, email, contact, adresse, reference) => {
        const result = await pool.query(
            'INSERT INTO commandeinfo (nom, prenom, email, contact, adresse, reference) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [nom, prenom, email, contact, adresse, reference]
        );
        return result.rows[0];
    },

    update: async (id, nom, prenom, email, contact, adresse, reference) => {
        const result = await pool.query(
            'UPDATE commandeinfo SET nom = $1, prenom = $2, email = $3, contact = $4, adresse = $5, reference = $6 WHERE id = $7 RETURNING *',
            [nom, prenom, email, contact, adresse, reference, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query('DELETE FROM commandeinfo WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = CommandeInfoModel;
