const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  startDate: Date,
  endDate: Date,
  paymentId: String,
  paymentStatus: { type: String, default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
