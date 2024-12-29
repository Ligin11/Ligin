const express = require('express');
const { addAdminVehicle, getAdminVehicles, editVehicle, viewBookings, getVehicleBookingHistory } = require('../controllers/adminController');
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/vehicles', authenticateUser, authenticateAdmin, addAdminVehicle);
router.put('/vehicle/:id', authenticateUser, authenticateAdmin, editVehicle);
router.get('/bookings', authenticateUser, authenticateAdmin, viewBookings);
router.get('/vehicles', authenticateUser, authenticateAdmin, getAdminVehicles);
router.get('/vehicles/:vehicleId/bookings', getVehicleBookingHistory);

module.exports = router;
