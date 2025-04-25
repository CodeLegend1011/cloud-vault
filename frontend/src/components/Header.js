import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">FileShare</Link>
      </div>
      <nav className="nav">
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === '/upload' ? 'active' : ''}>
            <Link to="/upload">Upload</Link>
          </li>
          <li className={location.pathname === '/list' ? 'active' : ''}>
            <Link to="/list">Files</Link>
          </li>
          <li className={location.pathname === '/login' ? 'active' : ''}>
            <Link to="/login">Login</Link>
          </li>
          <li className={location.pathname === '/register' ? 'active' : ''}>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;