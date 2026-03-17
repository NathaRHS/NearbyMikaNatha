const express = require('express');
const UploadController = require('../controllers/uploadController');
const { requireAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', requireAdmin, UploadController.uploadImage);

module.exports = router;
