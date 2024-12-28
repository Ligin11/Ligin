const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const { sendEmail } = require('../utils/email');

exports.getVehicles = async (req, res) => {
  try {
    const { type, priceRange } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (priceRange) filter.pricePerDay = { $lte: priceRange };

    const vehicles = await Vehicle.find(filter);
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.bookVehicle = async (req, res) => {
    try {
      const { vehicleId, userId, startDate, endDate, email } = req.body;
  
      const booking = new Booking({ user: userId, vehicle: vehicleId, startDate, endDate });
      await booking.save();
  
      // Fetch vehicle details
      const vehicle = await Vehicle.findById(vehicleId);
  
      // Send booking confirmation email
      const subject = 'Booking Confirmation';
      const text = `Dear Customer, your booking for ${vehicle.model} (${vehicle.year}) from ${startDate} to ${endDate} has been confirmed.`;
      sendEmail(email, subject, text);
  
      res.status(201).json({ bookingId: booking._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.cancelBooking = async (req, res) => {
    try {
      const { bookingId, email } = req.body;
  
      // Fetch booking and vehicle details
      const booking = await Booking.findById(bookingId).populate('vehicle');
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
  
      const vehicle = booking.vehicle;
  
      // Delete booking
      await Booking.findByIdAndDelete(bookingId);
  
      // Send cancellation email
      const subject = 'Booking Cancellation';
      const text = `Dear Customer, your booking for ${vehicle.model} (${vehicle.year}) has been successfully canceled.`;
      sendEmail(email, subject, text);
  
      res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.addReview = async (req, res) => {
  try {
    const { vehicleId, userId, comment, rating } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    vehicle.reviews.push({ user: userId, comment, rating });
    await vehicle.save();

    res.status(200).json({ message: 'Review added successfully', reviews: vehicle.reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};