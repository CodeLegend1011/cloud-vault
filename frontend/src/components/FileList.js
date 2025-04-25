import React from 'react';
import API_URL from '../services/api.js';

const FileList = ({ files }) => {
  // If no files or empty array
  if (!files || files.length === 0) {
    return (
      <div className="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
          <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
        <h3>No files found</h3>
        <p>Upload some files to see them here</p>
      </div>
    );
  }

  return (
    <ul className="file-list">
      {files.map((file, index) => (
        <li key={index} className="file-item">
          <div className="file-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
          </div>

          <div className="file-details">
            <h3 className="file-name">{file.name}</h3>
            <div className="file-meta">
              <div className="file-path">{file.path}</div>
            </div>
          </div>

          <div className="file-actions">
            <a
              href={`${API_URL}/api/files/download?path=${encodeURIComponent(file.path)}`}
              className="download-button"
              download
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FileList;