const express = require('express');
const { register, login, updateProfile, viewBookings, getProfile } = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile', updateProfile);
router.get('/profile', authenticateUser, getProfile);
router.get('/bookings', authenticateUser, viewBookings);

module.exports = router;
