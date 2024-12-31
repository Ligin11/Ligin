import React, { useState } from 'react';
import API from '../utils/api';

const CancellationForm = ({ bookingId, fetchBookings }) => {
  const [email, setEmail] = useState('');

  const handleCancellation = async () => {
    try {
      await API.post('/vehicles/cancel', { bookingId, email });
      fetchBookings();
      alert('Booking canceled! A confirmation email has been sent.');
    } catch (error) {
      console.error(error);
      alert('Cancellation failed.');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto animate-fade-in">
      <h4 className="text-2xl font-semibold text-indigo-600 text-center mb-4">
        Cancel Booking
      </h4>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Your Email</label>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleCancellation}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Cancel Booking
        </button>
      </form>
    </div>
  );
};

export default CancellationForm;
