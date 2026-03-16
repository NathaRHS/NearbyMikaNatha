const express = require('express');
const router = express.Router();
const ProduitController = require('../controllers/produitController');

router.get('/', ProduitController.getAll);
router.get('/:id', ProduitController.getById);
router.post('/', ProduitController.create);
router.put('/:id', ProduitController.update);
router.delete('/:id', ProduitController.delete);

module.exports = router;