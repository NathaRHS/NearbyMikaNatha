const express = require('express');
const router = express.Router();
const CommandeInfoController = require('../controllers/commandeInfoController');

router.get('/', CommandeInfoController.getAll);
router.get('/:id', CommandeInfoController.getById);
router.post('/', CommandeInfoController.create);
router.put('/:id', CommandeInfoController.update);
router.delete('/:id', CommandeInfoController.delete);

module.exports = router;
