import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

const LandingPage = () => {
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
    </div>
  );
};

export default LandingPage;