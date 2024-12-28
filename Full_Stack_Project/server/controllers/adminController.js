const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

exports.addVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json({ message: 'Vehicle added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.viewBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('vehicle user');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
