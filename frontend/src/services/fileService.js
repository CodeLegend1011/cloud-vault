// File handling service to interact with backend API
const fileService = {
    // Get auth token from localStorage
    getToken() {
      return localStorage.getItem('token');
    },
    
    // Upload a file
    async uploadFile(file, onProgress) {
      const token = this.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await fetch('/api/files/upload', {
          method: 'POST',
          headers: {
            'x-auth-token': token,
            // Don't set Content-Type here, let the browser set it with the boundary
          },
          body: formData,
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Upload failed');
        }
        
        return data;
      } catch (err) {
        console.error('File upload error:', err);
        throw err;
      }
    },
    
    // List all files
    async listFiles() {
      const token = this.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }
      
      try {
        const response = await fetch('/api/files/list', {
          method: 'GET',
          headers: {
            'x-auth-token': token,
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch files');
        }
        
        return data;
      } catch (err) {
        console.error('File listing error:', err);
        throw err;
      }
    },
    
    // Get download URL for a file
    getDownloadUrl(filePath) {
      const token = this.getToken();
      if (!token || !filePath) return null;
      
      // Return the URL that will be used for downloading
      return `/api/files/download?path=${encodeURIComponent(filePath)}`;
    },
    
    // Download a file
    async downloadFile(filePath, filename) {
      const token = this.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }
      
      try {
        // Create a download link
        const downloadUrl = this.getDownloadUrl(filePath);
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = downloadUrl;
        
        // Set request headers
        const requestOptions = {
          headers: {
            'x-auth-token': token,
          },
        };
        
        // Fetch the file to check if it exists
        const testResponse = await fetch(downloadUrl, requestOptions);
        if (!testResponse.ok) {
          throw new Error('File not found or access denied');
        }
        
        // Everything is ok, now download the file
        // The backend should set proper content-disposition headers
        link.setAttribute('download', filename || 'download');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return true;
      } catch (err) {
        console.error('File download error:', err);
        throw err;
      }
    }
  };
  
  export default fileService;