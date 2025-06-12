const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/auth.controller.js');
const { protect } = require('../middleware/auth.middleware.js');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;