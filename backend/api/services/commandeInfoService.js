const CommandeInfoModel = require('../models/commandeInfoModel');

const CommandeInfoService = {
    getAll: async () => {
        return await CommandeInfoModel.getAll();
    },

    getById: async (id) => {
        const commande = await CommandeInfoModel.getById(id);
        if (!commande) throw { status: 404, message: 'Commande non trouvée' };
        return commande;
    },

    create: async (nom, prenom, email, contact, adresse, reference) => {
        if (!nom || nom.trim() === '') throw { status: 400, message: 'Le nom est requis' };
        if (!prenom || prenom.trim() === '') throw { status: 400, message: 'Le prénom est requis' };
        return await CommandeInfoModel.create(
            nom.trim(), prenom.trim(),
            email ? email.trim() : null,
            contact ? contact.trim() : null,
            adresse ? adresse.trim() : null,
            reference ? reference.trim() : null
        );
    },

    update: async (id, nom, prenom, email, contact, adresse, reference) => {
        if (!nom || nom.trim() === '') throw { status: 400, message: 'Le nom est requis' };
        if (!prenom || prenom.trim() === '') throw { status: 400, message: 'Le prénom est requis' };
        const commande = await CommandeInfoModel.update(
            id, nom.trim(), prenom.trim(),
            email ? email.trim() : null,
            contact ? contact.trim() : null,
            adresse ? adresse.trim() : null,
            reference ? reference.trim() : null
        );
        if (!commande) throw { status: 404, message: 'Commande non trouvée' };
        return commande;
    },

    delete: async (id) => {
        const commande = await CommandeInfoModel.delete(id);
        if (!commande) throw { status: 404, message: 'Commande non trouvée' };
        return commande;
    }
};

module.exports = CommandeInfoService;
