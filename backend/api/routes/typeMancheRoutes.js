const express = require('express');
const router = express.Router();
const TypeMancheController = require('../controllers/typeMancheController');

router.get('/', TypeMancheController.getAll);
router.get('/:id', TypeMancheController.getById);
router.post('/', TypeMancheController.create);
router.put('/:id', TypeMancheController.update);
router.delete('/:id', TypeMancheController.delete);

module.exports = router;
