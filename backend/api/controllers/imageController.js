const ImageService = require('../services/imageService');

const ImageController = {
    getAll: async (req, res) => {
        try {
            const images = await ImageService.getAll();
            res.json(images);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const image = await ImageService.getById(req.params.id);
            res.json(image);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    create: async (req, res) => {
        try {
            const { idproduit, url } = req.body;
            const image = await ImageService.create(idproduit, url);
            res.status(201).json(image);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    update: async (req, res) => {
        try {
            const { idproduit, url } = req.body;
            const image = await ImageService.update(req.params.id, idproduit, url);
            res.json(image);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    delete: async (req, res) => {
        try {
            const image = await ImageService.delete(req.params.id);
            res.json({ message: 'Image supprimée', image });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    }
};

module.exports = ImageController;
