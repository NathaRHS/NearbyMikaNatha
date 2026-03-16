const express = require('express');
const UploadController = require('../controllers/uploadController');

const router = express.Router();

router.post('/', UploadController.uploadImage);

module.exports = router;
