import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import API_URL from '../services/api.js';

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { 
        email, 
        password 
      });
      
      console.log("Login successful", response.data);
      navigate("/upload");  // Redirect after successful login
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Error during login:", error.response?.data || error.message);
    }
  };

  return <LoginForm onSubmit={handleLogin} error={error} />;
};

export default LoginPage;