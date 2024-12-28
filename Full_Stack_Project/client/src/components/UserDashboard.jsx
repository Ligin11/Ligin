import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import CancellationForm from './CancellationForm';
import ReviewComponent from './ReviewComponent';

const UserDashboard = () => {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchProfile();
    fetchBookings();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get('/users/profile');
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async () => {
    try {
      await API.put('/users/profile', profile);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile.');
    }
  };

  const fetchBookings = async () => {
    try {
      const { data } = await API.get('/users/bookings');
      setBookings(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>

      {/* Profile Update */}
      <h3>Profile</h3>
      <input
        type="text"
        placeholder="Name"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />
      <button onClick={updateProfile}>Update Profile</button>

      {/* Booking History */}
      <h3>Your Bookings</h3>
      <div>
        {bookings.map((booking) => (
          <div key={booking._id}>
            <h4>{booking.vehicle.model}</h4>
            <p>
              Dates: {new Date(booking.startDate).toLocaleDateString()} -{' '}
              {new Date(booking.endDate).toLocaleDateString()}
            </p>
            <p>Payment Status: {booking.paymentStatus}</p>
            <button onClick={() => setSelectedBooking(booking)}>Cancel Booking</button>

            {/* Review Section */}
            {booking.paymentStatus === 'Paid' && (
              <ReviewComponent vehicleId={booking.vehicle._id} />
            )}
          </div>
        ))}
      </div>

      {/* Cancellation Form */}
      {selectedBooking && (
        <div>
          <h3>Cancellation Form</h3>
          <CancellationForm bookingId={selectedBooking._id} />
          <button onClick={() => setSelectedBooking(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
