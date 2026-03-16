const ProduitModel = require('../models/produitModel');

const ProduitService = {
    // Récupérer tous les produits
    getAll: async () => {
        return await ProduitModel.getAll();
    },

    // Récupérer un produit par son id
    getById: async (id) => {
        const produit = await ProduitModel.getById(id);
        if (!produit) {
            throw { status: 404, message: 'Produit non trouvé' };
        }
        return produit;
    },

    // Créer un nouveau produit
    create: async (nom) => {
        if (!nom || nom.trim() === '') {
            throw { status: 400, message: 'Le nom du produit est requis' };
        }
        return await ProduitModel.create(nom.trim());
    },

    // Mettre à jour un produit
    update: async (id, nom) => {
        if (!nom || nom.trim() === '') {
            throw { status: 400, message: 'Le nom du produit est requis' };
        }
        const produit = await ProduitModel.update(id, nom.trim());
        if (!produit) {
            throw { status: 404, message: 'Produit non trouvé' };
        }
        return produit;
    },

    // Supprimer un produit
    delete: async (id) => {
        const produit = await ProduitModel.delete(id);
        if (!produit) {
            throw { status: 404, message: 'Produit non trouvé' };
        }
        return produit;
    }
};

module.exports = ProduitService;
