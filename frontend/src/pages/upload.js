import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import "../styles/upload.css";

const FileUploadPage = ({ user }) => {
  const [status, setStatus] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  // Redirect if user doesn't have permissions
  if (user && user.role !== 'admin' && user.role !== 'editor') {
    return (
      <div className="permission-denied">
        <h2>Permission Denied</h2>
        <p>You need admin or editor privileges to upload files.</p>
        <button onClick={() => navigate('/list')} className="btn">Go Back to Files</button>
      </div>
    );
  }

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    // Add headers for authentication if available
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    
    // Get token from localStorage or user prop
    const token = localStorage.getItem('token') || user?.token;
    
    if (token) {
      headers["x-auth-token"] = token;
    } else {
      // If no token, show error
      setStatus({
        message: "Authentication required. Please log in again.",
        type: "error"
      });
      return;
    }

    try {
      // Use the correct API endpoint based on your environment
      // Try port 3001 instead of 5000 based on the error logs
      const apiUrl = "http://localhost:3001/api/files/upload";
      
      const response = await axios.post(apiUrl, formData, {
        headers,
        timeout: 10000 // 10 second timeout
      });
      
      setStatus({
        message: "File uploaded successfully!",
        type: "success"
      });
      
      console.log("File uploaded successfully", response.data);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ message: '', type: '' });
        // Redirect to list page after successful upload
        navigate('/list');
      }, 5000);
      
    } catch (error) {
      console.error("Upload failed", error.response?.data || error.message);
      
      // Handle different error types
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        setStatus({
          message: "Cannot connect to the server. Please check if the backend service is running.",
          type: "error"
        });
      } else if (error.response?.status === 401) {
        setStatus({
          message: "Authentication required. Please log in again.",
          type: "error"
        });
      } else {
        setStatus({
          message: `Upload failed: ${error.response?.data?.message || "Please try again."}`,
          type: "error"
        });
      }
    }
  };

  // Mock successful upload for demonstration if needed
  const handleDemoUpload = (file) => {
    setStatus({
      message: "Demo Mode: File would be uploaded in production mode.",
      type: "success"
    });
    
    setTimeout(() => {
      setStatus({ message: '', type: '' });
      navigate('/list');
    }, 5000);
    
    return Promise.resolve();
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="page-header">
          <h1>Upload Files</h1>
          <p>Upload your files securely to the document vault</p>
          
          {user && (
            <div className="role-info">
              {user.role === 'admin' && (
                <p className="role-note">As an admin, you can upload any file type with no restrictions.</p>
              )}
              {user.role === 'editor' && (
                <p className="role-note">As an editor, you can upload documents for organization use.</p>
              )}
            </div>
          )}
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
        
        <FileUpload onUpload={handleUpload} user={user} />
        
        <div className="upload-info">
          <h3>Upload Guidelines</h3>
          <ul>
            <li>Maximum file size: 50 MB</li>
            <li>Supported file types: Documents, Images, PDFs</li>
            <li>Files are encrypted during transit</li>
            {user?.role === 'admin' && (
              <li>Admins can upload additional file types including executables</li>
            )}
          </ul>
          
          <div className="actions">
            <button className="back-button" onClick={() => navigate('/list')}>
              Back to Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadPage;