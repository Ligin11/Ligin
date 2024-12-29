const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  status: { type: String, enum: ['active', 'canceled'], default: 'active' },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  paymentId: { type: String },
});

module.exports = mongoose.model('Booking', bookingSchema);
