const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

exports.addAdminVehicle = async (req, res) => {
  try {
    const adminId = req.user._id; // Assuming authentication middleware sets req.user
    const vehicleData = { ...req.body, createdBy: adminId };

    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();

    res.status(201).json(vehicle);
  } catch (error) {
    console.error('Error adding vehicle:', error);
    res.status(500).json({ error: 'Failed to add vehicle' });
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

exports.getAdminVehicles = async (req, res) => {
  try {
    const adminId = req.user._id; // Assuming authentication middleware sets req.user
    const vehicles = await Vehicle.find({ createdBy: adminId });

    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error fetching admin vehicles:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};

exports.getVehicleBookingHistory = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    // Find bookings for the specified vehicle
    const bookings = await Booking.find({ vehicle: vehicleId })
      .populate('user', 'name email') // Populate user info
      .populate('vehicle', 'model'); // Populate vehicle info

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this vehicle.' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching vehicle booking history:', error);
    res.status(500).json({ error: 'Failed to fetch booking history.' });
  }
};
