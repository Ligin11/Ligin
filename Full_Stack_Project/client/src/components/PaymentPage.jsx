import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../utils/api';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, vehicleId, userId, startDate, endDate, startTime, endTime, amount } = location.state;

  console.log('Razorpay Key:', import.meta.env.RAZORPAY_KEY);


  const handlePayment = async () => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY,
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
            email: localStorage.getItem('userEmail'),
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-700 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center animate-fade-in">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Complete Payment</h3>
        <p className="text-gray-600 mb-4">
          Your total payment amount is{' '}
          <span className="font-bold text-indigo-600">₹{amount}</span>.
        </p>
        <button
          onClick={handlePayment}
          className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Pay ₹{amount}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
