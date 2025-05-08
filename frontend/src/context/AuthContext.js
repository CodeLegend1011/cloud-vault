import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (via token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error('Failed to parse user data', err);
        logout(); // Clear invalid data
      }
    }
    
    setLoading(false);
  }, []);

  // Register new user
  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Make sure the URL matches your API endpoint exactly
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include' // Include credentials if using cookies
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
  
      // Save token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setUser(data.user);
      return data;
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Check if user has specific role
  const hasRole = (roles) => {
    if (!user) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    
    return user.role === roles;
  };

  // Check if user is admin
  const isAdmin = () => hasRole('admin');
  
  // Check if user can edit (admin or editor)
  const canEdit = () => hasRole(['admin', 'editor']);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        hasRole,
        isAdmin,
        canEdit
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;