const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, getUsers,getDashboardData, getUserCountByMonth } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for getting user profile, protected by `protect` middleware
router.get('/profile', protect, getUserProfile);

// Route for getting all users, protected by `protect` middleware

router.get('/users', protect, getUsers);
// Route for getting user dashboard, protected by `protect` middleware
router.get('/dashboard', protect, getDashboardData);
// In userRoutes.js
router.get('/user-count-by-month', protect, getUserCountByMonth);


module.exports = router;
