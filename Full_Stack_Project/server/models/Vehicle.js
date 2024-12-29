const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
  model: String,
  year: Number,
  pricePerDay: Number,
  type: String,
  availability: Boolean,
  image: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviews: [{ user: String, comment: String, rating: Number }],
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
