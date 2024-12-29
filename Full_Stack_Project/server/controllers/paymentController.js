const Razorpay = require('razorpay');
const Booking = require('../models/Booking');
const crypto = require('crypto');
const Vehicle = require('../models/Vehicle');
const dotenv= require('dotenv');
const { sendEmail } = require('../utils/email');
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay requires amount in paise
      currency,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order.' });
  }
};


exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      vehicleId,
      userId,
      startDate,
      endDate,
      startTime,
      endTime,
      email,
    } = req.body;

    // Validate Razorpay signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({ message: 'Payment verification failed.' });
    }

    // Check vehicle availability for selected time slots
    const existingBooking = await Booking.findOne({
      vehicle: vehicleId,
      status: 'active',
      $and: [
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

    // Mark vehicle as unavailable and confirm booking
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found.' });
    }

    const booking = new Booking({
      user: userId,
      vehicle: vehicleId,
      startDate,
      endDate,
      startTime,
      endTime,
      status: 'active',
      paymentStatus: 'paid',
      paymentId: razorpayPaymentId,
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

    res.status(200).json({ message: 'Payment verified and booking confirmed.', bookingId: booking._id });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment.' });
  }
};
