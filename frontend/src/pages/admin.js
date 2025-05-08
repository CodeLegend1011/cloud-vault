import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import '../styles/admin-dashboard.css';

const AdminPage = ({ user }) => {
  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/list" />;
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage users and their access levels</p>
      </div>
      
      <AdminDashboard user={user} />
    </div>
  );
};

export default AdminPage;