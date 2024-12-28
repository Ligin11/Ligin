const express = require('express');
const { addVehicle, editVehicle, viewBookings } = require('../controllers/adminController');
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/vehicle', authenticateUser, authenticateAdmin, addVehicle);
router.put('/vehicle/:id', authenticateUser, authenticateAdmin, editVehicle);
router.get('/bookings', authenticateUser, authenticateAdmin, viewBookings);

module.exports = router;
