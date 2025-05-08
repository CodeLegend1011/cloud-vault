import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/landing.css';

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="landing-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Secure Document Vault</h1>
          <p className="subtitle">
            Role-based access control, encrypted storage, and professional file management
          </p>
          
          {!user ? (
            <div className="cta-buttons">
              <Link to="/login" className="cta-btn login">
                Login
              </Link>
              <Link to="/register" className="cta-btn register">
                Register
              </Link>
            </div>
          ) : (
            <div className="cta-buttons">
              <Link to="/list" className="cta-btn files">
                View My Files
              </Link>
            </div>
          )}
        </div>
      </section>
      
      <section className="features-section">
        <h2>Key Features</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Role-Based Access</h3>
            <p>Admin, Editor, and Viewer roles with appropriate permissions</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Encrypted Storage</h3>
            <p>Secure file uploads and downloads via OwnCloud (WebDAV)</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🧑‍🤝‍🧑</div>
            <h3>User Management</h3>
            <p>Administrators can manage user permissions and roles</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📂</div>
            <h3>File Management</h3>
            <p>Upload, download, and manage files with ease</p>
          </div>
        </div>
      </section>
      
      <section className="how-it-works-section">
        <h2>How It Works</h2>
        
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create an Account</h3>
            <p>Register for a new account to get started</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Get Role Assignment</h3>
            <p>Admins can assign Editor or Viewer roles</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Upload & Manage Files</h3>
            <p>Editors can upload files, all users can download</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;