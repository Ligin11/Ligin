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
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

    try {
      const { data } = await API.post('/payment/create', {
        vehicleId: vehicle._id,
        userId,
        amount: totalAmount,
      });

      navigate('/payment', {
        state: {
          orderId: data.id,
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
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto animate-fade-in">
      <h4 className="text-2xl font-semibold text-indigo-600 text-center mb-4">
        Book {vehicle.model}
      </h4>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>
        <p
          className={`text-center font-medium ${
            isAvailable ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {availabilityMessage}
        </p>
        <button
          type="button"
          onClick={handleBooking}
          disabled={!isAvailable}
          className={`w-full py-2 rounded-lg text-white transition-colors duration-200 ${
            isAvailable ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isAvailable ? 'Proceed to Payment' : 'Unavailable'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;