import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const BookingForm = ({ vehicle }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [email, setEmail] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (startDate && endDate && startTime && endTime) {
      checkAvailability();
    }
  }, [startDate, endDate, startTime, endTime]);

  const checkAvailability = async () => {
    try {
      const { data } = await API.post('/vehicles/check-availability', {
        vehicleId: vehicle._id,
        startDate,
        endDate,
        startTime,
        endTime,
      });
      setIsAvailable(data.isAvailable);
      console.log(data);
      setAvailabilityMessage(data.isAvailable ? 'Vehicle is available!' : 'Vehicle is already booked.');
    } catch (error) {
      console.error('Error checking availability:', error);
      setAvailabilityMessage('Error checking availability. Please try again.');
    }
  };

  const handleBooking = async () => {
    if (!isAvailable) {
      alert('Vehicle is not available for the selected time slot.');
      return;
    }

    const userId = localStorage.getItem('userId');
    const totalAmount =
      vehicle.pricePerDay *
      (new Date(endDate) - new Date(startDate)) /
      (1000 * 60 * 60 * 24);

    try {
      const { data } = await API.post('/payment/create', {
        vehicleId: vehicle._id,
        userId,
        amount: totalAmount,
      });

      navigate('/payment', {
        state: {
          orderId: data.id, // Use `data.id` to pass the Razorpay order ID
          vehicleId: vehicle._id,
          userId,
          startDate,
          endDate,
          startTime,
          endTime,
          amount: totalAmount,
        },
      });
    } catch (error) {
      console.error('Error initiating booking:', error.response?.data || error.message);
      alert('Failed to initiate booking.');
    }
  };

  return (
    <div>
      <h4>Book {vehicle.model}</h4>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p style={{ color: isAvailable ? 'green' : 'red' }}>{availabilityMessage}</p>
      <button onClick={handleBooking} disabled={!isAvailable}>
        {isAvailable ? 'Proceed to Payment' : 'Unavailable'}
      </button>
    </div>
  );
};

export default BookingForm;
