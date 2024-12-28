import React from 'react';
import { useLocation } from 'react-router-dom';
import API from '../utils/api';

const PaymentPage = () => {
  const location = useLocation();
  const { bookingId, amount } = location.state || {};
  console.log(bookingId)
  console.log(amount)

  const handlePayment = async () => {
    try {
      const { data: order } = await API.post('/payment/create', { amount });

      const options = {
        key: 'rzp_test_3g7xHe8L0UbLRo',
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'Vehicle Rental',
        description: 'Payment for vehicle booking',
        handler: async (response) => {
          await API.post('/payment/verify', {
            bookingId,
            razorpayPaymentId: response.razorpay_payment_id,
          });
          alert('Payment successful! Your booking is confirmed.');
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert('Payment failed.');
    }
  };

  return (
    <div>
      <h3>Complete Payment</h3>
      <p>Total Amount: ₹{amount}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;
