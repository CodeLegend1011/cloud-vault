const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Simple auth middleware using JWT in headers
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('x-auth-token'); // Simpler than Bearer token
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yoursecretkey');
    
    // Find user (without password)
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Check if user is admin
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admin privileges required' });
  }
  next();
};

// Check if user can edit (admin or editor)
const editorMiddleware = (req, res, next) => {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'editor')) {
    return res.status(403).json({ message: 'Access denied: Editor privileges required' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware, editorMiddleware };