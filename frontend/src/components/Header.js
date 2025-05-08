import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = ({ user, onLogout }) => {

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>📁 Document Vault</h1>
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            {user ? (
              <>
                <li><Link to="/list">My Files</Link></li>
                {(user.role === 'admin' || user.role === 'editor') && (
                  <li><Link to="/upload">Upload</Link></li>
                )}
                {user.role === 'admin' && (
                  <li><Link to="/admin">Admin</Link></li>
                )}
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
        
        {user && (
          <div className="user-menu">
            <span className="user-info">
              <span className="username">{user.username}</span>
              <span className="role-badge" data-role={user.role}>{user.role}</span>
            </span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;