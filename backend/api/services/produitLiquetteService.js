const ProduitLiquetteModel = require('../models/produitLiquetteModel');

const ProduitLiquetteService = {
    getAll: async () => {
        return await ProduitLiquetteModel.getAll();
    },

    getById: async (id) => {
        const liquette = await ProduitLiquetteModel.getById(id);
        if (!liquette) throw { status: 404, message: 'Produit liquette non trouvé' };
        return liquette;
    },

    create: async (produit_id, idcouleur, idtype_manche, taille) => {
        if (!produit_id) throw { status: 400, message: 'produit_id est requis' };
        if (!idcouleur) throw { status: 400, message: 'idcouleur est requis' };
        if (!idtype_manche) throw { status: 400, message: 'idtype_manche est requis' };
        if (!taille || taille.trim() === '') throw { status: 400, message: 'La taille est requise' };
        return await ProduitLiquetteModel.create(produit_id, idcouleur, idtype_manche, taille.trim());
    },

    update: async (id, produit_id, idcouleur, idtype_manche, taille) => {
        if (!produit_id) throw { status: 400, message: 'produit_id est requis' };
        if (!idcouleur) throw { status: 400, message: 'idcouleur est requis' };
        if (!idtype_manche) throw { status: 400, message: 'idtype_manche est requis' };
        if (!taille || taille.trim() === '') throw { status: 400, message: 'La taille est requise' };
        const liquette = await ProduitLiquetteModel.update(id, produit_id, idcouleur, idtype_manche, taille.trim());
        if (!liquette) throw { status: 404, message: 'Produit liquette non trouvé' };
        return liquette;
    },

    delete: async (id) => {
        const liquette = await ProduitLiquetteModel.delete(id);
        if (!liquette) throw { status: 404, message: 'Produit liquette non trouvé' };
        return liquette;
    }
};

module.exports = ProduitLiquetteService;
