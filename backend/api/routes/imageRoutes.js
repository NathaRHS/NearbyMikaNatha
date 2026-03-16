const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/imageController');

router.get('/', ImageController.getAll);
router.get('/:id', ImageController.getById);
router.post('/', ImageController.create);
router.put('/:id', ImageController.update);
router.delete('/:id', ImageController.delete);

module.exports = router;
