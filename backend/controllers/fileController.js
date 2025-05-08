const fs = require('fs');
const path = require('path');
const {
  uploadFileToOwnCloud,
  listFilesFromOwnCloud,
  downloadFileFromOwnCloud,
  deleteFileFromOwnCloud
} = require('../utils/owncloudService');

// Upload file to OwnCloud - Only admin and editors can upload
const uploadFile = async (req, res) => {
  try {
    // Role check is handled by middleware
    
    if (!req.file) {
      console.error('No file in request');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filename = req.file.originalname;
    const remotePath = filename; // Upload to root directory
    const localFilePath = req.file.path; // Absolute local file path from multer

    if (!fs.existsSync(localFilePath)) {
      console.error('Local file does not exist:', localFilePath);
      return res.status(500).json({ message: 'Upload failed - file not found locally' });
    }

    const result = await uploadFileToOwnCloud(remotePath, localFilePath);

    res.status(200).json({ 
      message: 'File uploaded successfully', 
      data: result,
      uploadedTo: 'root directory',
      uploadedBy: req.user.username
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

// List files from OwnCloud - Everyone can list files
async function listFiles(req, res) {
  try {
    const files = await listFilesFromOwnCloud();  // now an array
    
    // All users can see the files list
    res.json({ 
      files,
      userRole: req.user.role
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching files', error: err.message });
  }
}

// Download file from OwnCloud - Everyone can download
const downloadFile = async (req, res) => {
  try {
    const remotePath = req.query.path;   // e.g. 'uploads/1612345-filename.txt'
    if (!remotePath) {
      return res.status(400).json({ message: 'Missing path query parameter' });
    }

    // All users (admins, editors, viewers) can download files
    
    // Let the service fetch a stream or buffer
    const { stream, filename } = await downloadFileFromOwnCloud(remotePath);

    // Set headers so the browser knows it's a download
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Pipe the OwnCloud response stream directly to the client
    stream.pipe(res);
  } catch (err) {
    console.error('Download error:', err);
    res.status(500).json({ message: 'Download failed', error: err.message });
  }
};

// Delete file from OwnCloud - Only admin can delete
const deleteFile = async (req, res) => {
  try {
    // Check if user is admin (additional security measure)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admin privileges required' });
    }

    const { path: remotePath } = req.body;
    
    if (!remotePath) {
      return res.status(400).json({ message: 'Missing path in request body' });
    }

    // Delete the file using the service
    const result = await deleteFileFromOwnCloud(remotePath);

    res.status(200).json({ 
      message: 'File deleted successfully',
      path: remotePath
    });
  } catch (err) {
    console.error('Delete error:', err);
    
    // Handle specific error cases
    if (err.response) {
      if (err.response.status === 404) {
        return res.status(404).json({ message: 'File not found on server' });
      }
      if (err.response.status === 403) {
        return res.status(403).json({ message: 'Server permission denied' });
      }
    }
    
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};

module.exports = { uploadFile, listFiles, downloadFile, deleteFile };