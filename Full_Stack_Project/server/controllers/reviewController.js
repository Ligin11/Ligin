const Review = require('../models/Review')
const Vehicle = require('../models/Vehicle')

exports.createReview = async (req, res) => {
    try {
      const { userId, vehicleId, rating, comment } = req.body;
  
      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found.' });
      }
  
      const review = new Review({ user: userId, vehicle: vehicleId, rating, comment, status: 'pending' });
      await review.save();
  
      res.status(201).json({ message: 'Review submitted and is pending approval.', review });
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ error: 'Failed to create review.' });
    }
  };

  exports.getVehicleReviews = async (req, res) => {
    try {
      const { vehicleId } = req.params;
  
      const reviews = await Review.find({ vehicle: vehicleId, status: 'approved' }).populate('user', 'name email');
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews.' });
    }
  };
  
  exports.getPendingReviews = async (req, res) => {
    try {
      const reviews = await Review.find({ status: 'pending' }).populate('user', 'name email').populate('vehicle', 'model');
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching pending reviews:', error);
      res.status(500).json({ error: 'Failed to fetch pending reviews.' });
    }
  };

  exports.updateReviewStatus = async (req, res) => {
    try {
      const { reviewId } = req.params;
      const { status } = req.body; // 'approved' or 'rejected'
  
      const review = await Review.findByIdAndUpdate(reviewId, { status }, { new: true });
      if (!review) {
        return res.status(404).json({ message: 'Review not found.' });
      }
  
      res.status(200).json({ message: `Review has been ${status}.`, review });
    } catch (error) {
      console.error('Error updating review status:', error);
      res.status(500).json({ error: 'Failed to update review status.' });
    }
  };

  exports.getUserReviewForVehicle = async (req, res) => {
    try {
      const { userId, vehicleId } = req.params;
      
      const review = await Review.findOne({ user: userId, vehicle: vehicleId });
      if (!review) {
        return res.status(404).json({ message: 'No review found.' });
      }
  
      res.status(200).json(review);
    } catch (error) {
      console.error('Error fetching user review:', error);
      res.status(500).json({ error: 'Failed to fetch review.' });
    }
  };
  
  