const express = require('express');
const router = express.Router();
const CouleurController = require('../controllers/couleurController');
const { requireAdmin } = require('../middlewares/authMiddleware');

router.get('/', CouleurController.getAll);
router.get('/:id', CouleurController.getById);
router.post('/', requireAdmin, CouleurController.create);
router.put('/:id', requireAdmin, CouleurController.update);
router.delete('/:id', requireAdmin, CouleurController.delete);

module.exports = router;
