const express = require('express');
const router = express.Router();
const TypeMancheController = require('../controllers/typeMancheController');
const { requireAdmin } = require('../middlewares/authMiddleware');

router.get('/', TypeMancheController.getAll);
router.get('/:id', TypeMancheController.getById);
router.post('/', requireAdmin, TypeMancheController.create);
router.put('/:id', requireAdmin, TypeMancheController.update);
router.delete('/:id', requireAdmin, TypeMancheController.delete);

module.exports = router;
