const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);  // Register new user
router.post('/login', loginUser);        // Login existing user

module.exports = router;
