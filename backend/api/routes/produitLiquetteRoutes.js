const express = require('express');
const router = express.Router();
const ProduitLiquetteController = require('../controllers/produitLiquetteController');

router.get('/', ProduitLiquetteController.getAll);
router.get('/:id', ProduitLiquetteController.getById);
router.post('/', ProduitLiquetteController.create);
router.put('/:id', ProduitLiquetteController.update);
router.delete('/:id', ProduitLiquetteController.delete);

module.exports = router;
