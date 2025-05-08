import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin-dashboard.css';

const AdminDashboard = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/list');
    }
  }, [user, navigate]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/auth/users', {
          method: 'GET',
          headers: {
            'x-auth-token': token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (userId) => {
    const user = users.find(u => u._id === userId);
    setSelectedUser(user);
    setSelectedRole(user ? user.role : '');
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleUpdateRole = async () => {
    if (!selectedUser || !selectedRole) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/users/role', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          userId: selectedUser._id,
          role: selectedRole
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      // Update local state
      setUsers(users.map(user => 
        user._id === selectedUser._id ? { ...user, role: selectedRole } : user
      ));
      
      alert(`Role updated for ${selectedUser.username}`);
    } catch (err) {
      console.error('Error updating role:', err);
      setError('Failed to update user role. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <div className="users-list">
          <h3>Users</h3>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className={selectedUser && selectedUser._id === user._id ? 'selected' : ''}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleUserSelect(user._id)}
                      className="select-btn"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="user-edit">
          <h3>Edit User Role</h3>
          {selectedUser ? (
            <div className="edit-form">
              <p><strong>Selected User:</strong> {selectedUser.username}</p>
              <p><strong>Current Role:</strong> {selectedUser.role}</p>
              
              <div className="form-group">
                <label htmlFor="role">New Role:</label>
                <select 
                  id="role" 
                  value={selectedRole} 
                  onChange={handleRoleChange}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              
              <button 
                onClick={handleUpdateRole} 
                className="update-btn"
                disabled={!selectedRole || selectedRole === selectedUser.role}
              >
                Update Role
              </button>
            </div>
          ) : (
            <p>Select a user to edit their role</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;