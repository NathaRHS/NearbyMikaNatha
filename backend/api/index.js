const express = require('express');
const path = require('path');
require('dotenv').config();
const { attachAdminSession } = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

function getAllowedOrigins() {
    return (process.env.CORS_ALLOWED_ORIGINS || '')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
}

function applyCors(req, res, next) {
    const origin = req.headers.origin;
    const allowedOrigins = getAllowedOrigins();

    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    }

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    return next();
}

// Middleware
app.use(applyCors);
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
const descriptionImageRoutes = require('./routes/descriptionImageRoutes');
const commandeInfoRoutes = require('./routes/commandeInfoRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/couleurs', couleurRoutes);
app.use('/api/produit-shoes', produitShoesRoutes);
app.use('/api/type-manches', typeMancheRoutes);
app.use('/api/produit-liquettes', produitLiquetteRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/description-images', descriptionImageRoutes);
app.use('/api/commande-infos', commandeInfoRoutes);
app.use('/api/uploads', uploadRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
