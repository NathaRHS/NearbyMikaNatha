const ProduitModel = require('../models/produitModel');

const ProduitService = {
    getAll: async () => {
        return await ProduitModel.getAll();
    },

    getById: async (id) => {
        const produit = await ProduitModel.getById(id);
        if (!produit) {
            throw { status: 404, message: 'Produit non trouve' };
        }
        return produit;
    },

    create: async (nom, description, prix) => {
        if (!nom || nom.trim() === '') {
            throw { status: 400, message: 'Le nom du produit est requis' };
        }

        if (prix !== undefined && prix !== null && prix !== '' && Number.isNaN(Number(prix))) {
            throw { status: 400, message: 'Le prix doit etre numerique' };
        }

        return await ProduitModel.create(
            nom.trim(),
            description?.trim() || null,
            prix === undefined || prix === null || prix === '' ? null : Number(prix)
        );
    },

    update: async (id, nom, description, prix) => {
        if (!nom || nom.trim() === '') {
            throw { status: 400, message: 'Le nom du produit est requis' };
        }

        if (prix !== undefined && prix !== null && prix !== '' && Number.isNaN(Number(prix))) {
            throw { status: 400, message: 'Le prix doit etre numerique' };
        }

        const produit = await ProduitModel.update(
            id,
            nom.trim(),
            description?.trim() || null,
            prix === undefined || prix === null || prix === '' ? null : Number(prix)
        );

        if (!produit) {
            throw { status: 404, message: 'Produit non trouve' };
        }

        return produit;
    },

    delete: async (id) => {
        const produit = await ProduitModel.delete(id);
        if (!produit) {
            throw { status: 404, message: 'Produit non trouve' };
        }
        return produit;
    }
};

module.exports = ProduitService;
