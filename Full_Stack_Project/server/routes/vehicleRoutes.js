const express = require('express');
const { getVehicles, bookVehicle, cancelBooking, addReview, deleteVehicle, updateVehicle, checkAvailability } = require('../controllers/vehicleController');
const { authenticateUser } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to get all vehicles with optional filters
router.get('/', getVehicles);

// Route to book a vehicle
router.post('/book', authenticateUser, bookVehicle);

// Route to cancel a booking
router.post('/cancel', authenticateUser, cancelBooking);

// Route to add a review to a vehicle
router.post('/review', authenticateUser, addReview);

// Delete a vehicle by ID
router.delete('/:id', deleteVehicle);

// Update a vehicle by ID
router.put('/:id', updateVehicle);

router.post('/check-availability', checkAvailability)

module.exports = router;