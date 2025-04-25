import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileList from '../components/FileList';
import '../styles/list.css';


const ListPage = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/files/list');
        setFiles(res.data.files || []);
        setError('');
      } catch (err) {
        setError('Failed to load files. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFiles();
  }, []);

  return (
    <div className="list-page">
      <div className="list-container">
        <div className="page-header">
          <h1>Your Files</h1>
          <p>View and download your files</p>
        </div>
        
        {error && (
          <div className="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading files...</p>
          </div>
        ) : (
          <FileList files={files} />
        )}
      </div>
    </div>
  );
};

export default ListPage;