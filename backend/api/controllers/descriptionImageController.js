const DescriptionImageService = require('../services/descriptionImageService');

const DescriptionImageController = {
    getAll: async (req, res) => {
        try {
            const images = await DescriptionImageService.getAll();
            res.json(images);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const image = await DescriptionImageService.getById(req.params.id);
            res.json(image);
        } catch (error) {
            const status = error.status || 500;
            res.status(status).json({ message: error.message || 'Erreur serveur' });
        }
    },

    create: async (req, res) => {
        try {
            const { produitId, url } = req.body;
            const image = await DescriptionImageService.create(produitId, url);
            res.status(201).json(image);
        } catch (error) {
            const status = error.status || 500;
            res.status(status).json({ message: error.message || 'Erreur serveur' });
        }
    },

    update: async (req, res) => {
        try {
            const { produitId, url } = req.body;
            const image = await DescriptionImageService.update(req.params.id, produitId, url);
            res.json(image);
        } catch (error) {
            const status = error.status || 500;
            res.status(status).json({ message: error.message || 'Erreur serveur' });
        }
    },

    delete: async (req, res) => {
        try {
            const image = await DescriptionImageService.delete(req.params.id);
            res.json({ message: 'Image description supprimee', image });
        } catch (error) {
            const status = error.status || 500;
            res.status(status).json({ message: error.message || 'Erreur serveur' });
        }
    }
};

module.exports = DescriptionImageController;
