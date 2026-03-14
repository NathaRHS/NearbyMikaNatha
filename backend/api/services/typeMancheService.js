const TypeMancheModel = require('../models/typeMancheModel');

const TypeMancheService = {
    getAll: async () => {
        return await TypeMancheModel.getAll();
    },

    getById: async (id) => {
        const typeManche = await TypeMancheModel.getById(id);
        if (!typeManche) throw { status: 404, message: 'Type de manche non trouvé' };
        return typeManche;
    },

    create: async (nom) => {
        if (!nom || nom.trim() === '') throw { status: 400, message: 'Le nom du type de manche est requis' };
        return await TypeMancheModel.create(nom.trim());
    },

    update: async (id, nom) => {
        if (!nom || nom.trim() === '') throw { status: 400, message: 'Le nom du type de manche est requis' };
        const typeManche = await TypeMancheModel.update(id, nom.trim());
        if (!typeManche) throw { status: 404, message: 'Type de manche non trouvé' };
        return typeManche;
    },

    delete: async (id) => {
        const typeManche = await TypeMancheModel.delete(id);
        if (!typeManche) throw { status: 404, message: 'Type de manche non trouvé' };
        return typeManche;
    }
};

module.exports = TypeMancheService;
