const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // By default, first user is admin, rest are viewers
    const isFirstUser = (await User.countDocuments({})) === 0;
    const role = isFirstUser ? 'admin' : 'viewer';

    const user = new User({ username, email, password, role });
    await user.save();
    
    // Create a token for the new user
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'yoursecretkey',
      { expiresIn: '1d' }
    );

    res.status(201).json({ 
      message: 'User registered successfully', 
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Create token with user info
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'yoursecretkey',
      { expiresIn: '1d' }
    );

    res.json({ 
      message: 'Login successful',
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    // Exclude password from results
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user role (admin only)
const updateUserRole = async (req, res) => {
  const { userId, role } = req.body;
  
  try {
    // Validate role
    if (!['admin', 'viewer', 'editor'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.json({ 
      message: 'User role updated successfully',
      user: {
        userId: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Update role error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, getAllUsers, updateUserRole };