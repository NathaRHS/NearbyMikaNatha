const TypeMancheService = require('../services/typeMancheService');

const TypeMancheController = {
    getAll: async (req, res) => {
        try {
            const types = await TypeMancheService.getAll();
            res.json(types);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const type = await TypeMancheService.getById(req.params.id);
            res.json(type);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    create: async (req, res) => {
        try {
            const { nom } = req.body;
            const type = await TypeMancheService.create(nom);
            res.status(201).json(type);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    update: async (req, res) => {
        try {
            const { nom } = req.body;
            const type = await TypeMancheService.update(req.params.id, nom);
            res.json(type);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    delete: async (req, res) => {
        try {
            const type = await TypeMancheService.delete(req.params.id);
            res.json({ message: 'Type de manche supprimé', type });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    }
};

module.exports = TypeMancheController;
