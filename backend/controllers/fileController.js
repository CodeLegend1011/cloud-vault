const fs = require('fs');
const path = require('path');
const {
  uploadFileToOwnCloud,
  listFilesFromOwnCloud,
  downloadFileFromOwnCloud
} = require('../utils/owncloudService');

// Upload file to OwnCloud
// Upload file to OwnCloud
const uploadFile = async (req, res) => {
  try {
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
      uploadedTo: 'root directory'
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};


// List files from OwnCloud
async function listFiles(req, res) {
  try {
    const files = await listFilesFromOwnCloud();  // now an array
    res.json({ files });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching files', error: err.message });
  }
}

const downloadFile = async (req, res) => {
  try {
    const remotePath = req.query.path;   // e.g. 'uploads/1612345-filename.txt'
    if (!remotePath) {
      return res.status(400).json({ message: 'Missing path query parameter' });
    }

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

module.exports = { uploadFile, listFiles, downloadFile };