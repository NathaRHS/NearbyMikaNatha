const ProduitLiquetteService = require('../services/produitLiquetteService');

const ProduitLiquetteController = {
    getAll: async (req, res) => {
        try {
            const liquettes = await ProduitLiquetteService.getAll();
            res.json(liquettes);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const liquette = await ProduitLiquetteService.getById(req.params.id);
            res.json(liquette);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    create: async (req, res) => {
        try {
            const { produit_id, idcouleur, idtype_manche, taille } = req.body;
            const liquette = await ProduitLiquetteService.create(produit_id, idcouleur, idtype_manche, taille);
            res.status(201).json(liquette);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    update: async (req, res) => {
        try {
            const { produit_id, idcouleur, idtype_manche, taille } = req.body;
            const liquette = await ProduitLiquetteService.update(req.params.id, produit_id, idcouleur, idtype_manche, taille);
            res.json(liquette);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    delete: async (req, res) => {
        try {
            const liquette = await ProduitLiquetteService.delete(req.params.id);
            res.json({ message: 'Produit liquette supprimé', liquette });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    }
};

module.exports = ProduitLiquetteController;
