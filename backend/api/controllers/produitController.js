const ProduitService = require('../services/produitService');

const ProduitController = {
    // GET /api/produits
    getAll: async (req, res) => {
        try {
            const produits = await ProduitService.getAll();
            res.json(produits);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
    },

    // GET /api/produits/:id
    getById: async (req, res) => {
        try {
            const produit = await ProduitService.getById(req.params.id);
            res.json(produit);
        } catch (error) {
            const status = error.status || 500;
            res.status(status).json({ message: error.message || 'Erreur serveur' });
        }
    },

    // POST /api/produits
    create: async (req, res) => {
        try {
            const { nom } = req.body;
            const produit = await ProduitService.create(nom);
            res.status(201).json(produit);
        } catch (error) {
            const status = error.status || 500;
            res.status(status).json({ message: error.message || 'Erreur serveur' });
        }
    },

    // PUT /api/produits/:id
    update: async (req, res) => {
        try {
            const { nom } = req.body;
            const produit = await ProduitService.update(req.params.id, nom);
            res.json(produit);
        } catch (error) {
            const status = error.status || 500;
            res.status(status).json({ message: error.message || 'Erreur serveur' });
        }
    },

    // DELETE /api/produits/:id
    delete: async (req, res) => {
        try {
            const produit = await ProduitService.delete(req.params.id);
            res.json({ message: 'Produit supprimé', produit });
        } catch (error) {
            const status = error.status || 500;
            res.status(status).json({ message: error.message || 'Erreur serveur' });
        }
    }
};

module.exports = ProduitController;
