import React from 'react';
import RegisterForm from '../components/RegisterForm';
import '../styles/authentication.css';

const RegisterPage = ({ setUser }) => {
  return (
    <div className="register-page">
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Sign up to access our secure document vault</p>
          </div>
          <RegisterForm setUser={setUser} />
        </div>
        <div className="auth-image">
          {/* This is where a decorative image would go */}
          <div className="auth-overlay">
            <div className="auth-quote">
              <h3>File Security Matters</h3>
              <p>"Your documents deserve the highest level of protection and accessibility."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;