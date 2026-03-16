const CouleurModel = require('../models/couleurModel');

const CouleurService = {
    getAll: async () => {
        return await CouleurModel.getAll();
    },

    getById: async (id) => {
        const couleur = await CouleurModel.getById(id);
        if (!couleur) throw { status: 404, message: 'Couleur non trouvée' };
        return couleur;
    },

    create: async (nom) => {
        if (!nom || nom.trim() === '') throw { status: 400, message: 'Le nom de la couleur est requis' };
        return await CouleurModel.create(nom.trim());
    },

    update: async (id, nom) => {
        if (!nom || nom.trim() === '') throw { status: 400, message: 'Le nom de la couleur est requis' };
        const couleur = await CouleurModel.update(id, nom.trim());
        if (!couleur) throw { status: 404, message: 'Couleur non trouvée' };
        return couleur;
    },

    delete: async (id) => {
        const couleur = await CouleurModel.delete(id);
        if (!couleur) throw { status: 404, message: 'Couleur non trouvée' };
        return couleur;
    }
};

module.exports = CouleurService;
