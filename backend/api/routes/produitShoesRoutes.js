const express = require('express');
const router = express.Router();
const ProduitShoesController = require('../controllers/produitShoesController');
const { requireAdmin } = require('../middlewares/authMiddleware');

router.get('/', ProduitShoesController.getAll);
router.get('/:id', ProduitShoesController.getById);
router.post('/', requireAdmin, ProduitShoesController.create);
router.put('/:id', requireAdmin, ProduitShoesController.update);
router.delete('/:id', requireAdmin, ProduitShoesController.delete);

module.exports = router;
