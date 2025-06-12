const express = require('express');
const { registerUser, loginUser, getUserProfile, logout } = require('../controllers/auth.controller.js');
const { protect } = require('../middleware/auth.middleware.js');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.post('/logout', protect, logout);

module.exports = router;