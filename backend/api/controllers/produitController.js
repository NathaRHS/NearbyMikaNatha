const ProduitService = require('../services/produitService');

const ProduitController = {
    getAll: async (req, res) => {
        try {
            const produits = await ProduitService.getAll();
            res.json(produits);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const produit = await ProduitService.getById(req.params.id);
            res.json(produit);
        } catch (error) {
            const status = error.status || 500;
            res.status(status).json({ message: error.message || 'Erreur serveur' });
        }
    },

    create: async (req, res) => {
        try {
            const { nom, description, prix } = req.body;
            const produit = await ProduitService.create(nom, description, prix);
            res.status(201).json(produit);
        } catch (error) {
            const status = error.status || 500;
            res.status(status).json({ message: error.message || 'Erreur serveur' });
        }
    },

    update: async (req, res) => {
        try {
            const { nom, description, prix } = req.body;
            const produit = await ProduitService.update(req.params.id, nom, description, prix);
            res.json(produit);
        } catch (error) {
            const status = error.status || 500;
            res.status(status).json({ message: error.message || 'Erreur serveur' });
        }
    },

    delete: async (req, res) => {
        try {
            const produit = await ProduitService.delete(req.params.id);
            res.json({ message: 'Produit supprime', produit });
        } catch (error) {
            const status = error.status || 500;
            res.status(status).json({ message: error.message || 'Erreur serveur' });
        }
    }
};

module.exports = ProduitController;
