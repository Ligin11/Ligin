const express = require('express');
const router = express.Router();
const {
  createReview,
  getVehicleReviews,
  getPendingReviews,
  updateReviewStatus,
  getUserReviewForVehicle,
} = require('../controllers/reviewController');

console.log("dfdf")
// Create a new review
router.post('/', createReview);

// Get all approved reviews for a specific vehicle
router.get('/vehicle/:vehicleId', getVehicleReviews);

// Get all pending reviews for admin moderation
router.get('/pending', getPendingReviews);

// Update review status (approve or reject)
router.put('/:reviewId', updateReviewStatus);

router.get('/user/:userId/vehicle/:vehicleId', getUserReviewForVehicle);


module.exports = router;
