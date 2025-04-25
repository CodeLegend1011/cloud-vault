import React, { useState } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import "../styles/upload.css";

const FileUploadPage = () => {
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      setStatus({
        message: "File uploaded successfully!",
        type: "success"
      });
      
      console.log("File uploaded successfully", response.data);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ message: '', type: '' });
      }, 5000);
      
    } catch (error) {
      setStatus({
        message: "Upload failed. Please try again.",
        type: "error"
      });
      
      console.error("Upload failed", error.response?.data || error.message);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="page-header">
          <h1>Upload Files</h1>
          <p>Upload your files securely to the cloud</p>
        </div>
        
        {status.message && (
          <div className={`status-message ${status.type}`}>
            {status.type === 'success' && (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            )}
            {status.type === 'error' && (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            )}
            {status.message}
          </div>
        )}
        
        <FileUpload onUpload={handleUpload} />
        
        <div className="upload-info">
          <h3>Upload Guidelines</h3>
          <ul>
            <li>Maximum file size: 50 MB</li>
            <li>Supported file types: Documents, Images, PDFs</li>
            <li>Files are encrypted during transit</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FileUploadPage;