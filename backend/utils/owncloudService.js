const axios = require('axios');
const fs = require('fs');
const { PassThrough } = require('stream');
const xml2js = require('xml2js');


// Helper function to create directory if it doesn't exist
const createDirectoryIfNotExists = async (dirPath) => {
  try {
    // Remove leading slash if present
    const normalizedPath = dirPath.startsWith('/') ? dirPath.substring(1) : dirPath;
    
    // Build directory URL
    let baseUrl = process.env.OWNCLOUD_URL;
    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1);
    }
    const dirUrl = `${baseUrl}/${normalizedPath}`;
    
    console.log('Creating directory at:', dirUrl);
    
    // Make MKCOL request to create directory
    await axios({
      method: 'MKCOL',
      url: dirUrl,
      auth: {
        username: process.env.OWNCLOUD_USERNAME,
        password: process.env.OWNCLOUD_PASSWORD
      }
    });
    
    console.log('Directory created successfully');
    return true;
  } catch (err) {
    // If directory already exists (405) or parent path exists (409), consider it a success
    if (err.response && (err.response.status === 405 || err.response.status === 409)) {
      console.log('Directory already exists or parent path issue:', err.response.status);
      return true;
    }
    
    console.error('Error creating directory:', err.message);
    throw err;
  }
};

// Upload file to OwnCloud
const uploadFileToOwnCloud = async (filePath, localFilePath) => {
  try {
    // Debug info
    console.log('=== OwnCloud Debug Info ===');
    console.log('Base URL:', process.env.OWNCLOUD_URL);
    console.log('Username:', process.env.OWNCLOUD_USERNAME);
    console.log('File path to upload:', filePath);
    console.log('Local file path:', localFilePath);
    
    // Check if file exists
    if (!fs.existsSync(localFilePath)) {
      console.error('Local file does not exist:', localFilePath);
      throw new Error('Local file not found');
    }
    
    // Extract directory path from file path
    const lastSlashIndex = filePath.lastIndexOf('/');
    if (lastSlashIndex > 0) {
      const dirPath = filePath.substring(0, lastSlashIndex);
      console.log('Creating directory:', dirPath);
      await createDirectoryIfNotExists(dirPath);
    }
    
    // Read file as buffer
    const fileContent = fs.readFileSync(localFilePath);
    
    // Build full URL manually
    let fullUrl = process.env.OWNCLOUD_URL;
    
    // Remove trailing slash from base URL if it exists
    if (fullUrl.endsWith('/')) {
      fullUrl = fullUrl.slice(0, -1);
    }
    
    // Remove leading slash from file path if it exists
    const cleanFilePath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
    
    // Combine URL parts
    fullUrl = `${fullUrl}/${cleanFilePath}`;
    console.log('Full URL:', fullUrl);
    
    // Make request
    const response = await axios({
      method: 'put',
      url: fullUrl,
      auth: {
        username: process.env.OWNCLOUD_USERNAME,
        password: process.env.OWNCLOUD_PASSWORD
      },
      data: fileContent,
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    });
    
    console.log('Upload response status:', response.status);
    
    return {
      success: true,
      status: response.status,
      path: filePath
    };
  } catch (err) {
    console.error('OwnCloud upload error details:', {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
      url: err.config?.url
    });
    throw new Error(`Failed to upload file to OwnCloud: ${err.message}`);
  }
};

// List files in OwnCloud
async function listFilesFromOwnCloud() {
  const baseUrl = process.env.OWNCLOUD_URL.replace(/\/+$/, '');
  const res = await axios({
    method: 'PROPFIND',
    url: baseUrl,
    auth: { username: process.env.OWNCLOUD_USERNAME, password: process.env.OWNCLOUD_PASSWORD },
    headers: { Depth: '1', 'Content-Type': 'application/xml' }
  });

  // parse XML to JSON
  const json = await xml2js.parseStringPromise(res.data);
  const responses = json['d:multistatus']['d:response'] || [];

  // strip the leading href prefix
  const prefix = '/remote.php/dav/files/admin/';
  const files = responses
    .map(r => r['d:href'][0])
    .filter(href => href.startsWith(prefix))
    .map(href => {
      const rel = href.slice(prefix.length);      // e.g. "uploads/abc.txt"
      return { name: rel.split('/').pop(), path: rel };
    });

  return files;  // [{ name, path }, …]
}

// Download file from OwnCloud
const downloadFileFromOwnCloud = async (filePath) => {
  let baseUrl = process.env.OWNCLOUD_URL.replace(/\/+$/, ''); // trim trailing slash
  const cleanPath = filePath.replace(/^\/+/, '');            // trim leading slash
  const url = `${baseUrl}/${cleanPath}`;

  // Create an axios GET request with responseType 'stream'
  const response = await axios({
    method: 'get',
    url,
    auth: {
      username: process.env.OWNCLOUD_USERNAME,
      password: process.env.OWNCLOUD_PASSWORD
    },
    responseType: 'stream'
  });

  // Extract filename from the path
  const filename = cleanPath.split('/').pop();

  // Return the stream and filename
  return { stream: response.data, filename };
};

// Delete file from OwnCloud
const deleteFileFromOwnCloud = async (filePath) => {
  try {
    // Build full URL manually
    let baseUrl = process.env.OWNCLOUD_URL;
    
    // Remove trailing slash from base URL if it exists
    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1);
    }
    
    // Remove leading slash from file path if it exists
    const cleanFilePath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
    
    // Combine URL parts
    const fullUrl = `${baseUrl}/${cleanFilePath}`;
    console.log('Delete URL:', fullUrl);
    
    // Make request
    const response = await axios({
      method: 'DELETE',
      url: fullUrl,
      auth: {
        username: process.env.OWNCLOUD_USERNAME,
        password: process.env.OWNCLOUD_PASSWORD
      }
    });
    
    console.log('Delete response status:', response.status);
    
    return {
      success: true,
      status: response.status,
      path: filePath
    };
  } catch (err) {
    console.error('OwnCloud delete error details:', {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
      url: err.config?.url
    });
    throw new Error(`Failed to delete file from OwnCloud: ${err.message}`);
  }
};

module.exports = {
  uploadFileToOwnCloud,
  listFilesFromOwnCloud,
  downloadFileFromOwnCloud,
  deleteFileFromOwnCloud
};