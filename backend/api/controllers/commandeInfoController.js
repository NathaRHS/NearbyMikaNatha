const CommandeInfoService = require('../services/commandeInfoService');

const CommandeInfoController = {
    getAll: async (req, res) => {
        try {
            const commandes = await CommandeInfoService.getAll();
            res.json(commandes);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const commande = await CommandeInfoService.getById(req.params.id);
            res.json(commande);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    create: async (req, res) => {
        try {
            const { nom, prenom, email, contact, adresse, reference } = req.body;
            const commande = await CommandeInfoService.create(nom, prenom, email, contact, adresse, reference);
            res.status(201).json(commande);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    update: async (req, res) => {
        try {
            const { nom, prenom, email, contact, adresse, reference } = req.body;
            const commande = await CommandeInfoService.update(req.params.id, nom, prenom, email, contact, adresse, reference);
            res.json(commande);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    },

    delete: async (req, res) => {
        try {
            const commande = await CommandeInfoService.delete(req.params.id);
            res.json({ message: 'Commande supprimée', commande });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
        }
    }
};

module.exports = CommandeInfoController;
