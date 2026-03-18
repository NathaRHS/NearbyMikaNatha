const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/imageController');
const { requireAdmin } = require('../middlewares/authMiddleware');

router.get('/', ImageController.getAll);
router.get('/:id', ImageController.getById);
router.post('/', requireAdmin, ImageController.create);
router.put('/:id', requireAdmin, ImageController.update);
router.delete('/:id', requireAdmin, ImageController.delete);

module.exports = router;
