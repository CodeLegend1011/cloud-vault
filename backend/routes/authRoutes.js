const express = require('express');
const { 
  registerUser, 
  loginUser, 
  getAllUsers, 
  updateUserRole 
} = require('../controllers/authController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', registerUser);  // Register new user
router.post('/login', loginUser);        // Login existing user

// Protected routes (admin only)
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.put('/users/role', authMiddleware, adminMiddleware, updateUserRole);

module.exports = router;