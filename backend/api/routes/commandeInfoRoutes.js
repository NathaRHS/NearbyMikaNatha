const express = require('express');
const router = express.Router();
const CommandeInfoController = require('../controllers/commandeInfoController');
const { requireAdmin } = require('../middlewares/authMiddleware');

router.get('/', requireAdmin, CommandeInfoController.getAll);
router.get('/:id', requireAdmin, CommandeInfoController.getById);
router.post('/', requireAdmin, CommandeInfoController.create);
router.put('/:id', requireAdmin, CommandeInfoController.update);
router.delete('/:id', requireAdmin, CommandeInfoController.delete);

module.exports = router;

