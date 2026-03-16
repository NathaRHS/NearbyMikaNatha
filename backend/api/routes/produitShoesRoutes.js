const express = require('express');
const router = express.Router();
const ProduitShoesController = require('../controllers/produitShoesController');

router.get('/', ProduitShoesController.getAll);
router.get('/:id', ProduitShoesController.getById);
router.post('/', ProduitShoesController.create);
router.put('/:id', ProduitShoesController.update);
router.delete('/:id', ProduitShoesController.delete);

module.exports = router;
