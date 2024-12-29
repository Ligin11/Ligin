import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../utils/api';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, vehicleId, userId, startDate, endDate, startTime, endTime, amount } = location.state;

  const handlePayment = async () => {
    const options = {
      key: 'rzp_test_3g7xHe8L0UbLRo',
      amount: amount * 100,
      currency: 'INR',
      order_id: orderId,
      name: 'Vehicle Booking',
      description: 'Complete your payment',
      handler: async (response) => {
        try {
          const { data } = await API.post('/payment/verify', {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            vehicleId,
            userId,
            startDate,
            endDate,
            startTime,
            endTime,
            email:localStorage.getItem('userEmail'),
          });

          alert('Payment successful and booking confirmed!');
          navigate('/dashboard');
        } catch (error) {
          console.error('Error verifying payment:', error.response?.data || error.message);
          alert('Payment verification failed. Booking not confirmed.');
        }
      },
      theme: {
        color: '#3399cc',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div>
      <h3>Complete Payment</h3>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;
