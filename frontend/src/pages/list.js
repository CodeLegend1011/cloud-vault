import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileList from '../components/FileList';
import '../styles/list.css';

const ListPage = ({ user }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        
        // Add authentication if user is logged in
        const headers = {};
        const token = localStorage.getItem('token') || user?.token;
        
        if (token) {
          headers['x-auth-token'] = token;
        }

        // Use the correct API endpoint based on your environment
        // Try port 3001 instead of 5000 based on the error logs
        const apiUrl = 'http://localhost:3001/api/files/list';
        
        const res = await axios.get(apiUrl, { 
          headers,
          timeout: 10000 // 10 second timeout
        });
        
        setFiles(res.data.files || []);
        setError('');
      } catch (err) {
        console.error('Error fetching files:', err);
        
        // Handle different error types
        if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error')) {
          setError('Cannot connect to the server. Please check if the backend service is running.');
        } else if (err.response?.status === 401) {
          setError('Authentication required. Please log in again.');
        } else {
          setError('Failed to load files. Please try again later.');
        }
        
        // Set empty array to handle the error gracefully
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFiles();
  }, [user]);

  // If we're having connection issues, we can show some demo files for testing UI
  const showDemoFiles = error && error.includes('Cannot connect');
  
  if (showDemoFiles && files.length === 0) {
    const demoFiles = [
      { name: 'Document1.pdf', path: '/documents/Document1.pdf', size: 1024 * 1024 * 2.5, lastmod: new Date() },
      { name: 'Spreadsheet.xlsx', path: '/documents/Spreadsheet.xlsx', size: 1024 * 512, lastmod: new Date() },
      { name: 'Presentation.pptx', path: '/documents/Presentation.pptx', size: 1024 * 1024 * 5, lastmod: new Date() }
    ];
    
    // Set demo files if we can't connect to the backend
    setFiles(demoFiles);
  }

  return (
    <div className="list-page">
      <div className="list-container">
        <div className="page-header">
          <h1>Document Library</h1>
          <p>Access your secure document vault files</p>
          
          {user && (
            <div className="role-info">
              <p className="role-description">
                {user.role === 'admin' && (
                  <>Your <b>admin</b> role allows you to upload files and manage users.</>
                )}
                {user.role === 'editor' && (
                  <>Your <b>editor</b> role allows you to upload and access files.</>
                )}
                {user.role === 'viewer' && (
                  <>Your <b>viewer</b> role allows you to view and download files.</>
                )}
                {!user.role && (
                  <>You have <b>standard</b> access to view and download files.</>
                )}
              </p>
            </div>
          )}
          
          {(user?.role === 'admin' || user?.role === 'editor') && (
            <div className="upload-action">
              <a href="/upload" className="upload-btn">Upload New File</a>
            </div>
          )}
        </div>
        
        {error && (
          <div className="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
            {showDemoFiles && (
              <div className="demo-note">
                <p>Showing demo files for testing purposes</p>
              </div>
            )}
          </div>
        )}
        
        {loading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading files...</p>
          </div>
        ) : (
          <FileList files={files} user={user} />
        )}
      </div>
    </div>
  );
};

export default ListPage;