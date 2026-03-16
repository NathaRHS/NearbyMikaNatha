const express = require('express');
const router = express.Router();
const CouleurController = require('../controllers/couleurController');

router.get('/', CouleurController.getAll);
router.get('/:id', CouleurController.getById);
router.post('/', CouleurController.create);
router.put('/:id', CouleurController.update);
router.delete('/:id', CouleurController.delete);

module.exports = router;
