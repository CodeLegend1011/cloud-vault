import React from 'react';

const FileList = ({ files, user }) => {
  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = (filePath) => {
    try {
      // For demo purposes, show an alert when backend is not connected
      if (filePath.startsWith('/documents/')) {
        alert('Demo Mode: Download would start in production mode');
        return;
      }

      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Authentication required. Please log in again.');
        return;
      }
      
      // Create a proper download URL with the API endpoint and token
      const downloadUrl = `http://localhost:3001/api/files/download?path=${encodeURIComponent(filePath)}`;
      
      // Create an anchor element to handle the download with proper authorization
      const link = document.createElement('a');
      link.href = downloadUrl;
      
      // Set authorization header via fetch instead of direct window.open
      fetch(downloadUrl, {
        headers: {
          'x-auth-token': token
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Download failed: ' + response.status);
        }
        return response.blob();
      })
      .then(blob => {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);
        
        // Set the URL as the href for the link
        link.href = url;
        
        // Extract filename from path
        const filename = filePath.split('/').pop();
        link.download = filename;
        
        // Append to the document, click it, and then remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the blob URL
        window.URL.revokeObjectURL(url);
      })
      .catch(err => {
        console.error('Download error:', err);
        alert('Failed to download file. Please try again.');
      });
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download file. Please try again.');
    }
  };

  const handleDelete = (filePath) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Authentication required. Please log in again.');
        return;
      }
      
      // Confirm deletion
      if (!window.confirm('Are you sure you want to delete this file?')) {
        return;
      }
      
      // Send delete request to the API
      fetch(`http://localhost:3001/api/files/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ path: filePath })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Delete failed: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        alert('File deleted successfully');
        // Reload the page or update the file list
        window.location.reload();
      })
      .catch(err => {
        console.error('Delete error:', err);
        alert('Failed to delete file. Please try again.');
      });
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete file. Please try again.');
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    
    switch(extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'ppt':
      case 'pptx':
        return '📑';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      case 'zip':
      case 'rar':
        return '🗜️';
      default:
        return '📁';
    }
  };
  
  return (
    <ul className="file-list">
      {files.map((file, index) => (
        <li key={index} className="file-item">
          <div className="file-icon">
            {getFileIcon(file.name || file.path)}
          </div>
          
          <div className="file-details">
            <h3 className="file-name">{file.name}</h3>
            <div className="file-meta">
              <div className="file-path">{file.path}</div>
              {file.size && (
                <div className="file-size">{formatFileSize(file.size)}</div>
              )}
              {file.lastmod && (
                <div className="file-date">Added: {new Date(file.lastmod).toLocaleDateString()}</div>
              )}
            </div>
          </div>
          
          <div className="file-actions">
            <button 
              onClick={() => handleDownload(file.path)}
              className="download-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download
            </button>
            
            {user?.role === 'admin' && (
              <button 
                className="delete-button"
                onClick={() => handleDelete(file.path)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Delete
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FileList;