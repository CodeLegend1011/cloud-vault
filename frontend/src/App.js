import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Page imports
import LandingPage from './pages/index';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ListPage from './pages/list';
import UploadPage from './pages/upload';
import AdminPage from './pages/admin';

// Component imports
import Header from './components/Header';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on first load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  // Auth protection route wrapper
  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    if (loading) return <div>Loading...</div>;
    
    if (!user) {
      return <Navigate to="/login" />;
    }
    
    // If allowedRoles is empty or includes user's role, render the children
    if (allowedRoles.length === 0 || allowedRoles.includes(user.role)) {
      return children;
    }
    
    // Redirect to list page if not allowed
    return <Navigate to="/list" />;
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={logoutHandler} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/list" /> : <LoginPage setUser={setUser} />} />
          <Route path="/register" element={user ? <Navigate to="/list" /> : <RegisterPage setUser={setUser} />} />
          <Route 
            path="/list" 
            element={
              <ProtectedRoute>
                <ListPage user={user} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/upload" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'editor']}>
                <UploadPage user={user} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPage user={user} />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;