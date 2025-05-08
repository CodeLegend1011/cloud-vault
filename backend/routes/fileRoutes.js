const express = require('express');
const { uploadFile, listFiles, downloadFile, deleteFile } = require('../controllers/fileController');
const upload = require('../middleware/uploadMiddleware');
const { authMiddleware, editorMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Upload - only admin and editors can upload
router.post('/upload', editorMiddleware, upload.single('file'), uploadFile);

// List - all authenticated users can list files
router.get('/list', listFiles);

// Download - all authenticated users can download files
router.get('/download', downloadFile);

// Delete - only admin can delete files
router.delete('/delete', adminMiddleware, deleteFile);

module.exports = router;