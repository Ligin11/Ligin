import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import CancellationForm from './CancellationForm';
import ReviewComponent from './ReviewComponent';

const UserDashboard = () => {
  const [profile, setProfile] = useState({ _id: '', name: '', email: '' });
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedReviewBooking, setSelectedReviewBooking] = useState(null);

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
      const userId = profile._id || localStorage.getItem('userId');
      const { data } = await API.get('/users/bookings');
      const updatedBookings = await Promise.all(
        data.map(async (booking) => {
          try {
            const response = await API.get(`/reviews/user/${userId}/vehicle/${booking.vehicle._id}`);
            return { ...booking, hasReview: response.data ? true : false };
          } catch (error) {
            if (error.response?.status === 404) {
              return { ...booking, hasReview: false }; // No review exists
            }
            console.error('Error checking review:', error);
            return { ...booking, hasReview: false };
          }
        })
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewSubmitted = (bookingId) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking._id === bookingId ? { ...booking, hasReview: true } : booking
      )
    );
    setSelectedReviewBooking(null); // Close the review section after submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-500 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">User Dashboard</h2>

        {/* Profile Update Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">Profile</h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            onClick={updateProfile}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Update Profile
          </button>
        </div>

        {/* Booking History Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">Your Bookings</h3>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="border border-gray-300 p-4 rounded-lg shadow-sm bg-gray-100"
              >
                <h4 className="text-lg font-semibold text-gray-700">{booking.vehicle.model}</h4>
                <p className="text-gray-600">
                  Dates: {new Date(booking.startDate).toLocaleDateString()} -{' '}
                  {new Date(booking.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">Payment Status: {booking.paymentStatus}</p>
                <div className="space-x-4 mt-2">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Cancel Booking
                  </button>
                  {booking.paymentStatus === 'paid' && !booking.hasReview && (
                    <button
                      onClick={() => setSelectedReviewBooking(booking)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Submit Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cancellation Form Section */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className='bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] p-6'>
            <h3 className="text-xl font-semibold text-indigo-600 mb-4">Cancellation Form</h3>
            <CancellationForm bookingId={selectedBooking._id} fetchBookings={fetchBookings} />
            <button
              onClick={() => setSelectedBooking(null)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
            </div>
          </div>
        )}

        {/* Review Form Section */}
        {selectedReviewBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className='bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] p-6'>
            <h3 className="text-xl font-semibold text-indigo-600 mb-4">Submit Review</h3>
            <ReviewComponent
              vehicleId={selectedReviewBooking.vehicle._id}
              bookingId={selectedReviewBooking._id}
              userId={profile._id}
              onReviewSubmitted={() => handleReviewSubmitted(selectedReviewBooking._id)}
            />
            <button
              onClick={() => setSelectedReviewBooking(null)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
