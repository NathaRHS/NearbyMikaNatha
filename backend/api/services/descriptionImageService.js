const DescriptionImageModel = require('../models/descriptionImageModel');

const DescriptionImageService = {
    getAll: async () => {
        return await DescriptionImageModel.getAll();
    },

    getById: async (id) => {
        const image = await DescriptionImageModel.getById(id);

        if (!image) {
            throw { status: 404, message: 'Image description non trouvee' };
        }

        return image;
    },

    create: async (produitId, url) => {
        if (!produitId) {
            throw { status: 400, message: 'produitId est requis' };
        }

        if (!url || url.trim() === '') {
            throw { status: 400, message: 'url est requise' };
        }

        const image = await DescriptionImageModel.create(Number(produitId), url.trim());

        if (!image) {
            throw { status: 404, message: 'Produit non trouve' };
        }

        return image;
    },

    update: async (id, produitId, url) => {
        if (!produitId) {
            throw { status: 400, message: 'produitId est requis' };
        }

        if (!url || url.trim() === '') {
            throw { status: 400, message: 'url est requise' };
        }

        const image = await DescriptionImageModel.update(id, Number(produitId), url.trim());

        if (!image) {
            throw { status: 404, message: 'Image description ou produit non trouve' };
        }

        return image;
    },

    delete: async (id) => {
        const image = await DescriptionImageModel.delete(id);

        if (!image) {
            throw { status: 404, message: 'Image description non trouvee' };
        }

        return image;
    }
};

module.exports = DescriptionImageService;
