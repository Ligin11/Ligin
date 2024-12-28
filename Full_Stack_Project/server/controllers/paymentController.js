const Razorpay = require('razorpay');
const Booking = require('../models/Booking');
const dotenv= require('dotenv');
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;
    console.log(amount);
    console.log(process.env.RAZORPAY_KEY_ID)
    const order = await razorpay.orders.create({ amount: amount * 100, currency });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { bookingId, razorpayPaymentId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.paymentId = razorpayPaymentId;
    booking.paymentStatus = 'Paid';
    await booking.save();

    res.status(200).json({ message: 'Payment successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
