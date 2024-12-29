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
    <div>
      <h4>Cancel Booking</h4>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleCancellation}>Cancel Booking</button>
    </div>
  );
};

export default CancellationForm;