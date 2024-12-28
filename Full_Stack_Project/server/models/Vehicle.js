const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
  model: String,
  year: Number,
  pricePerDay: Number,
  type: String,
  availability: Boolean,
  image: String,
  reviews: [{ user: String, comment: String, rating: Number }],
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
