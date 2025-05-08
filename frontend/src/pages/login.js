import React from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/authentication.css';

const LoginPage = ({ setUser }) => {
  return (
    <div className="login-page">
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Log in to access your secure document vault</p>
          </div>
          <LoginForm setUser={setUser} />
        </div>
        <div className="auth-image">
          {/* This is where a decorative image would go */}
          <div className="auth-overlay">
            <div className="auth-quote">
              <h3>Secure Document Management</h3>
              <p>"Keep your important files safe, organized, and accessible."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;