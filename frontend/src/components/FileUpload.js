import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/fileUpload.css';

const FileUpload = ({ onUpload, user }) => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const navigate = useNavigate();

  // Check user permissions
  if (user && user.role !== 'admin' && user.role !== 'editor') {
    return (
      <div className="permission-denied">
        <h2>Permission Denied</h2>
        <p>You need admin or editor privileges to upload files.</p>
        <button onClick={() => navigate('/list')} className="btn">Go Back to Files</button>
      </div>
    );
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file size (max 50MB)
      if (selectedFile.size > 50 * 1024 * 1024) {
        setUploadError('File size exceeds the 50MB limit');
        return;
      }
      
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setUploadError('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      // Validate file size (max 50MB)
      if (droppedFile.size > 50 * 1024 * 1024) {
        setUploadError('File size exceeds the 50MB limit');
        return;
      }
      
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setUploadError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadError('Please select a file to upload');
      return;
    }
    
    // Clear any previous errors
    setUploadError('');
    
    // Check if token exists before attempting upload
    const token = localStorage.getItem('token') || user?.token;
    if (!token) {
      setUploadError('Authentication required. Please log in again.');
      return;
    }
    
    try {
      setUploading(true);
      await onUpload(file);
      // Reset form
      setFile(null);
      setFileName('');
    } catch (error) {
      console.error('Upload error in component:', error);
      setUploadError(error.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form className="file-upload" onSubmit={handleSubmit}>
      {uploadError && (
        <div className="upload-error">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {uploadError}
        </div>
      )}
      
      <div 
        className={`drop-zone ${dragging ? 'active' : ''} ${fileName ? 'has-file' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="drop-zone-content">
          {!fileName ? (
            <>
              <div className="upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <p>Drag files here or <span className="browse-text">browse</span></p>
              {user?.role === 'admin' && (
                <span className="admin-note">As an admin, you can upload any file type</span>
              )}
            </>
          ) : (
            <div className="file-info">
              <div className="file-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <span className="file-name">{fileName}</span>
              {file && (
                <span className="file-size">{formatFileSize(file.size)}</span>
              )}
            </div>
          )}
          <input 
            type="file" 
            className="file-input"
            onChange={handleFileChange}
            id="fileInput"
          />
        </div>
      </div>
      <div className="upload-actions">
        <button 
          type="submit" 
          className="upload-button primary-button" 
          disabled={!file || uploading}
        >
          {uploading ? (
            <>
              <span className="spinner-small"></span>
              Uploading...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              Upload File
            </>
          )}
        </button>
        <button 
          type="button" 
          className="cancel-button secondary-button" 
          onClick={() => navigate('/list')} 
          disabled={uploading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Cancel
        </button>
      </div>
    </form>
  );
};

// Helper function for formatting file size
const formatFileSize = (bytes) => {
  if (!bytes) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]}`;
  
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
};

export default FileUpload;