const express = require('express');
const router = express.Router();
const ProduitController = require('../controllers/produitController');
const { requireAdmin } = require('../middlewares/authMiddleware');

router.get('/', ProduitController.getAll);
router.get('/:id', ProduitController.getById);
router.post('/', requireAdmin, ProduitController.create);
router.put('/:id', requireAdmin, ProduitController.update);
router.delete('/:id', requireAdmin, ProduitController.delete);

module.exports = router;
