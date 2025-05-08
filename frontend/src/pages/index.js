import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

const LandingPage = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="landing-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Secure File Sharing Made Simple</h1>
          <p>Share files securely between teams and departments with enterprise-grade security</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">
              Get Started
            </Link>
            <Link to="/login" className="cta-button secondary">
              Sign In
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4F46E5" d="M40,70 L160,70 L160,180 L40,180 Z" />
            <path fill="#818CF8" d="M40,40 L120,40 L120,70 L40,70 Z" />
            <path fill="#C7D2FE" d="M65,20 L160,20 L160,40 L85,40 Z" />
            <circle cx="65" cy="100" r="10" fill="#FFFFFF" />
            <circle cx="95" cy="100" r="10" fill="#FFFFFF" />
            <circle cx="125" cy="100" r="10" fill="#FFFFFF" />
            <rect x="60" y="130" width="80" height="10" rx="2" fill="#FFFFFF" />
            <rect x="60" y="150" width="80" height="10" rx="2" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3>Secure Storage</h3>
            <p>All files are encrypted and stored securely</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3>Fast Transfer</h3>
            <p>Upload and download files at lightning speed</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>Team Sharing</h3>
            <p>Share files with specific users or departments</p>
          </div>
        </div>
      </div>

      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-logo">
            <Link to="/">
              <h2>📁 Document Vault</h2>
            </Link>
            <p>Your secure document management solution</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">My Files</Link></li>
                <li><Link to="/upload">Upload</Link></li>
                <li><Link to="/register">Register</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Security</a></li>
                <li><a href="#">API</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Document Vault. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;