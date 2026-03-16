const CouleurService = require('../services/couleurService');

const CouleurController = {
    getAll: async (req, res) => {
        try {
            const couleurs = await CouleurService.getAll();
            res.json(couleurs);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const couleur = await CouleurService.getById(req.params.id);
            res.json(couleur);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    create: async (req, res) => {
        try {
            const { nom } = req.body;
            const couleur = await CouleurService.create(nom);
            res.status(201).json(couleur);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    update: async (req, res) => {
        try {
            const { nom } = req.body;
            const couleur = await CouleurService.update(req.params.id, nom);
            res.json(couleur);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    delete: async (req, res) => {
        try {
            const couleur = await CouleurService.delete(req.params.id);
            res.json({ message: 'Couleur supprimée', couleur });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    }
};

module.exports = CouleurController;
