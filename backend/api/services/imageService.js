const ImageModel = require('../models/imageModel');

const ImageService = {
    getAll: async () => {
        return await ImageModel.getAll();
    },

    getById: async (id) => {
        const image = await ImageModel.getById(id);
        if (!image) throw { status: 404, message: 'Image non trouvée' };
        return image;
    },

    create: async (idproduit, url) => {
        if (!idproduit) throw { status: 400, message: 'idproduit est requis' };
        if (!url || url.trim() === '') throw { status: 400, message: "L'URL est requise" };
        return await ImageModel.create(idproduit, url.trim());
    },

    update: async (id, idproduit, url) => {
        if (!idproduit) throw { status: 400, message: 'idproduit est requis' };
        if (!url || url.trim() === '') throw { status: 400, message: "L'URL est requise" };
        const image = await ImageModel.update(id, idproduit, url.trim());
        if (!image) throw { status: 404, message: 'Image non trouvée' };
        return image;
    },

    delete: async (id) => {
        const image = await ImageModel.delete(id);
        if (!image) throw { status: 404, message: 'Image non trouvée' };
        return image;
    }
};

module.exports = ImageService;
