const User = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const registerUser = async (req, res) => {
    try {
      const { name, number, password, confirmPassword } = req.body;
  
      // Validation
      if (!name || !number || !password || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields'
        });
      }
  
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: 'Passwords do not match'
        });
      }
  
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ number });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this phone number'
        });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create user
      const user = await User.create({
        name: name.trim(),
        number: number.trim(),
        password: hashedPassword
      });
  
      // Generate token
      const token = generateToken(user._id);
  
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          number: user.number
        }
      });
  
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this phone number'
        });
      }
  
      res.status(500).json({
        success: false,
        message: 'Server error during registration'
      });
    }
  };
  
  // Login User
  const loginUser = async (req, res) => {
    try {
      const { number, password } = req.body;
  
      // Validation
      if (!number || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide phone number and password'
        });
      }
  
      // Find user and include password for comparison
      const user = await User.findOne({ number }).select('+password');
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // Check password
      const isPasswordMatch = await user.comparePassword(password);
      
      if (!isPasswordMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // Generate token
      const token = generateToken(user._id);
  
      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          number: user.number
        }
      });
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during login'
      });
    }
  };
  
  // Get User Profile (protected route)
  const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
  
      res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          number: user.number,
          createdAt: user.createdAt
        }
      });
  
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  };
  
  // Logout user
  const logout = async (req, res) => {
    try {
      // User is already available from auth middleware
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Not authenticated'
        });
      }

      // Clear any user-specific data if needed
      // For example, you might want to clear refresh tokens or session data here

      res.status(200).json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Error during logout'
      });
    }
  };
  
  module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logout
  };