const ProduitShoesService = require('../services/produitShoesService');

const ProduitShoesController = {
    getAll: async (req, res) => {
        try {
            const shoes = await ProduitShoesService.getAll();
            res.json(shoes);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const shoes = await ProduitShoesService.getById(req.params.id);
            res.json(shoes);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    create: async (req, res) => {
        try {
            const { produit_id, idcouleur, pointure } = req.body;
            const shoes = await ProduitShoesService.create(produit_id, idcouleur, pointure);
            res.status(201).json(shoes);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    update: async (req, res) => {
        try {
            const { produit_id, idcouleur, pointure } = req.body;
            const shoes = await ProduitShoesService.update(req.params.id, produit_id, idcouleur, pointure);
            res.json(shoes);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    delete: async (req, res) => {
        try {
            const shoes = await ProduitShoesService.delete(req.params.id);
            res.json({ message: 'Produit shoes supprimé', shoes });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    }
};

module.exports = ProduitShoesController;
