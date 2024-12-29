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
    const { vehicleId, userId, startDate, endDate, startTime, endTime, email } = req.body;

    // Check if the vehicle is available
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle || !vehicle.availability) {
      return res.status(400).json({ message: 'Vehicle is not available for booking.' });
    }

    // Check for overlapping bookings with the same vehicle
    const existingBooking = await Booking.findOne({
      vehicle: vehicleId,
      status: 'active',
      $or: [
        {
          $and: [
            { startDate: { $lte: endDate } },
            { endDate: { $gte: startDate } },
            { startTime: { $lte: endTime }, endTime: { $gte: startTime } },
          ],
        },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Vehicle is already booked for the selected time slot.' });
    }

    // Create new booking
    const booking = new Booking({
      user: userId,
      vehicle: vehicleId,
      startDate,
      endDate,
      startTime,
      endTime,
    });
    await booking.save();

    // Send confirmation email
    const emailContent = `
      Your booking for ${vehicle.model} has been confirmed!
      Booking Details:
      - Start Date: ${startDate}
      - End Date: ${endDate}
      - Start Time: ${startTime}
      - End Time: ${endTime}
      - Payment ID: ${razorpayPaymentId}

      Thank you for booking with us!
    `;
    console.log(email);
    await sendEmail(email , 'Booking Confirmation', emailContent);

    res.status(201).json({booking});
  } catch (error) {
    console.error('Error booking vehicle:', error);
    res.status(500).json({ error: 'Failed to book vehicle' });
  }
};

exports.checkAvailability = async (req, res) => {
  try {
    const { vehicleId, startDate, endDate, startTime, endTime } = req.body;
    console.log(req.body)
    const existingBooking = await Booking.findOne({
      vehicle: vehicleId,
      status: 'active', // Only check active bookings
      $or: [
        {
          // Overlapping dates
          $and: [
            { startDate: { $lte: endDate } }, // Booking starts before or during the selected endDate
            { endDate: { $gte: startDate } }, // Booking ends after or during the selected startDate
          ],
        },
        {
          // Overlapping times on the same day
          $and: [
            { startDate: { $eq: startDate } }, // Same start date
            { endDate: { $eq: endDate } }, // Same end date
            { startTime: { $lt: endTime } }, // Booking starts before the selected endTime
            { endTime: { $gt: startTime } }, // Booking ends after the selected startTime
          ],
        },
      ],
    });
    console.log(existingBooking);

    res.status(200).json({ isAvailable: !existingBooking });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ error: 'Failed to check availability' });
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

exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ error: 'Failed to delete vehicle' });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Update vehicle by ID
    const vehicle = await Vehicle.findByIdAndUpdate(id, updatedData, { new: true });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    res.status(200).json(vehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({ error: 'Failed to update vehicle' });
  }
};