import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/index";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import FileUploadPage from "./pages/upload";
import ListPage from "./pages/list";
import "./styles/globals.css";

const App = () => (
  <Router>
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/upload" element={<FileUploadPage />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} FileShare. All rights reserved.</p>
      </footer>
    </div>
  </Router>
);

export default App;