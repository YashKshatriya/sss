const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth.controller');
const auth = require('../middleware/auth.middleware');

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);

module.exports = router; 