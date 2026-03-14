const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
const produitRoutes = require('./routes/produitRoutes');
const couleurRoutes = require('./routes/couleurRoutes');
const produitShoesRoutes = require('./routes/produitShoesRoutes');
const typeMancheRoutes = require('./routes/typeMancheRoutes');
const produitLiquetteRoutes = require('./routes/produitLiquetteRoutes');
const imageRoutes = require('./routes/imageRoutes');
const commandeInfoRoutes = require('./routes/commandeInfoRoutes');

app.use('/api/produits', produitRoutes);
app.use('/api/couleurs', couleurRoutes);
app.use('/api/produit-shoes', produitShoesRoutes);
app.use('/api/type-manches', typeMancheRoutes);
app.use('/api/produit-liquettes', produitLiquetteRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/commande-infos', commandeInfoRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});