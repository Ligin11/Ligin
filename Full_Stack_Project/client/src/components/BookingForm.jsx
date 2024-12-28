import React, { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import API from '../utils/api';

const BookingForm = ({ vehicle }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleBooking = async () => {
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
    console.log('User ID:', userId); // Debugging log
    try {
      const { data } = await API.post('/vehicles/book', {
        vehicleId: vehicle._id,
        userId,
        startDate,
        endDate,
        startTime,
        endTime,
        email,
      });
      console.log(data.bookingId)
      const totalAmount =
        vehicle.pricePerDay *
        (new Date(endDate) - new Date(startDate)) /
        (1000 * 60 * 60 * 24);

      navigate('/payment', { state: { bookingId: data.bookingId, amount: totalAmount } });
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div>
      <h4>Book {vehicle.model}</h4>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleBooking}>Proceed to Payment</button>
    </div>
  );
};

export default BookingForm;
