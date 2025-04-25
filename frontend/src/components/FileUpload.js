import React, { useState } from 'react';
import '../styles/fileUpload.css';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
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
      setFile(e.dataTransfer.files[0]);
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    
    setUploading(true);
    await onUpload(file);
    setUploading(false);
    setFile(null);
    setFileName('');
  };

  return (
    <form className="file-upload" onSubmit={handleSubmit}>
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
      <button type="submit" className="upload-button" disabled={!file || uploading}>
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
    </form>
  );
};

export default FileUpload;