const express = require('express');
const path = require('path');
require('dotenv').config();
const { attachAdminSession } = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '20mb' }));
app.use(attachAdminSession);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const produitRoutes = require('./routes/produitRoutes');
const couleurRoutes = require('./routes/couleurRoutes');
const produitShoesRoutes = require('./routes/produitShoesRoutes');
const typeMancheRoutes = require('./routes/typeMancheRoutes');
const produitLiquetteRoutes = require('./routes/produitLiquetteRoutes');
const imageRoutes = require('./routes/imageRoutes');
const commandeInfoRoutes = require('./routes/commandeInfoRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/couleurs', couleurRoutes);
app.use('/api/produit-shoes', produitShoesRoutes);
app.use('/api/type-manches', typeMancheRoutes);
app.use('/api/produit-liquettes', produitLiquetteRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/commande-infos', commandeInfoRoutes);
app.use('/api/uploads', uploadRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
