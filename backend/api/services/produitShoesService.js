const ProduitShoesModel = require('../models/produitShoesModel');

const ProduitShoesService = {
    getAll: async () => {
        return await ProduitShoesModel.getAll();
    },

    getById: async (id) => {
        const shoes = await ProduitShoesModel.getById(id);
        if (!shoes) throw { status: 404, message: 'Produit shoes non trouvé' };
        return shoes;
    },

    create: async (produit_id, idcouleur, pointure) => {
        if (!produit_id) throw { status: 400, message: 'produit_id est requis' };
        if (!idcouleur) throw { status: 400, message: 'idcouleur est requis' };
        if (!pointure || pointure.trim() === '') throw { status: 400, message: 'La pointure est requise' };
        return await ProduitShoesModel.create(produit_id, idcouleur, pointure.trim());
    },

    update: async (id, produit_id, idcouleur, pointure) => {
        if (!produit_id) throw { status: 400, message: 'produit_id est requis' };
        if (!idcouleur) throw { status: 400, message: 'idcouleur est requis' };
        if (!pointure || pointure.trim() === '') throw { status: 400, message: 'La pointure est requise' };
        const shoes = await ProduitShoesModel.update(id, produit_id, idcouleur, pointure.trim());
        if (!shoes) throw { status: 404, message: 'Produit shoes non trouvé' };
        return shoes;
    },

    delete: async (id) => {
        const shoes = await ProduitShoesModel.delete(id);
        if (!shoes) throw { status: 404, message: 'Produit shoes non trouvé' };
        return shoes;
    }
};

module.exports = ProduitShoesService;
