const express = require('express');
const DescriptionImageController = require('../controllers/descriptionImageController');
const { requireAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', DescriptionImageController.getAll);
router.get('/:id', DescriptionImageController.getById);
router.post('/', requireAdmin, DescriptionImageController.create);
router.put('/:id', requireAdmin, DescriptionImageController.update);
router.delete('/:id', requireAdmin, DescriptionImageController.delete);

module.exports = router;
