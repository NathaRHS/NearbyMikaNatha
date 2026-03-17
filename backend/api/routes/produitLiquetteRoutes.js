const express = require('express');
const router = express.Router();
const ProduitLiquetteController = require('../controllers/produitLiquetteController');
const { requireAdmin } = require('../middlewares/authMiddleware');

router.get('/', ProduitLiquetteController.getAll);
router.get('/:id', ProduitLiquetteController.getById);
router.post('/', requireAdmin, ProduitLiquetteController.create);
router.put('/:id', requireAdmin, ProduitLiquetteController.update);
router.delete('/:id', requireAdmin, ProduitLiquetteController.delete);

module.exports = router;
