const express = require('express');
const { uploadFile, listFiles, downloadFile } = require('../controllers/fileController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// upload
router.post('/upload', upload.single('file'), uploadFile);

// list
router.get('/list', listFiles);

// download?path=uploads%2F1612345-filename.txt
router.get('/download', downloadFile);

module.exports = router;
