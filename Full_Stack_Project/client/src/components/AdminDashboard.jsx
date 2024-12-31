import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import axios from 'axios';

const AdminDashboard = ({ handleLogout }) => {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    model: '',
    year: '',
    pricePerDay: '',
    type: '',
    availability: true,
    image: '',
  });
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data } = await API.get('/admin/vehicles');
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const fetchBookingHistory = async (vehicleId) => {
    try {
      const { data } = await API.get(`/admin/vehicles/${vehicleId}/bookings`);
      if (data.length === 0) {
        setPopupMessage('No booking history found for this vehicle.');
      } else {
        setBookingHistory(data);
        setSelectedVehicle(vehicleId);
      }
    } catch (error) {
      console.error('Error fetching booking history:', error);
      setPopupMessage('No Booking history found for this vehicle.');
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'vehicle_preset');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dnuwj6auu/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return '';
    }
  };

  const addVehicle = async () => {
    if (newVehicle.image) {
      const imageUrl = await handleImageUpload(newVehicle.image);
      newVehicle.image = imageUrl;
    }

    try {
      await API.post('/admin/vehicles', newVehicle);
      fetchVehicles();
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
  };

  const handleUpdate = async () => {
    try {
      if (editingVehicle.image instanceof File) {
        const imageUrl = await handleImageUpload(editingVehicle.image);
        editingVehicle.image = imageUrl;
      }

      await API.put(`/vehicles/${editingVehicle._id}`, editingVehicle);
      alert('Vehicle updated successfully!');
      setEditingVehicle(null);
      fetchVehicles();
    } catch (error) {
      console.error('Error updating vehicle:', error);
      alert('Failed to update vehicle.');
    }
  };

  const handleDelete = async (vehicleId) => {
    try {
      await API.delete(`/vehicles/${vehicleId}`);
      alert('Vehicle deleted successfully!');
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      alert('Failed to delete vehicle.');
    }
  };

  const closePopup = () => {
    setPopupMessage('');
    setBookingHistory([]);
    setSelectedVehicle(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-700 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-white">Admin Dashboard</h2>
          <div className="space-x-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
            <button
              onClick={() => navigate('/admin/reviews')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Review Management
            </button>
          </div>
        </div>

        {/* Add or Edit Vehicle */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">
            {editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="model"
              placeholder="Model"
              value={editingVehicle ? editingVehicle.model : newVehicle.model}
              onChange={(e) =>
                editingVehicle
                  ? setEditingVehicle({ ...editingVehicle, model: e.target.value })
                  : setNewVehicle({ ...newVehicle, model: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <input
              name="year"
              type="number"
              placeholder="Year"
              value={editingVehicle ? editingVehicle.year : newVehicle.year}
              onChange={(e) =>
                editingVehicle
                  ? setEditingVehicle({ ...editingVehicle, year: e.target.value })
                  : setNewVehicle({ ...newVehicle, year: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <input
              name="pricePerDay"
              type="number"
              placeholder="Price Per Day"
              value={editingVehicle ? editingVehicle.pricePerDay : newVehicle.pricePerDay}
              onChange={(e) =>
                editingVehicle
                  ? setEditingVehicle({ ...editingVehicle, pricePerDay: e.target.value })
                  : setNewVehicle({ ...newVehicle, pricePerDay: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <input
              name="type"
              placeholder="Type"
              value={editingVehicle ? editingVehicle.type : newVehicle.type}
              onChange={(e) =>
                editingVehicle
                  ? setEditingVehicle({ ...editingVehicle, type: e.target.value })
                  : setNewVehicle({ ...newVehicle, type: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="file"
              onChange={(e) =>
                editingVehicle
                  ? setEditingVehicle({ ...editingVehicle, image: e.target.files[0] })
                  : setNewVehicle({ ...newVehicle, image: e.target.files[0] })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            onClick={editingVehicle ? handleUpdate : addVehicle}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
          </button>
        </div>

        {/* Vehicle List */}
        <h3 className="text-xl font-semibold text-white mb-4">Manage Vehicles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={vehicle.image}
                alt={vehicle.model}
                className="w-50 h-50 object-cover rounded-md mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-800">{vehicle.model}</h4>
              <p className="text-gray-600 mb-4">₹{vehicle.pricePerDay} per day</p>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(vehicle)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => fetchBookingHistory(vehicle._id)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  View Booking History
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Booking History */}
        {popupMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className='bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] p-6'>
            <p>{popupMessage}</p>
            <button
              onClick={closePopup}
              className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
            </div>
          </div>
        )}

        {selectedVehicle && bookingHistory.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className='bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] p-6'>
            <h3 className="text-xl font-semibold text-indigo-600 mb-4">Booking History</h3>
            <button
              onClick={closePopup}
              className="mb-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Close
            </button>
            <ul className="space-y-4">
              {bookingHistory.map((booking) => (
                <li key={booking._id} className="border-b border-gray-200 pb-4">
                  <p className="text-gray-800">
                    User: {booking.user?.name || 'N/A'} ({booking.user?.email || 'N/A'})
                  </p>
                  <p className="text-gray-600">
                    Dates: {new Date(booking.startDate).toLocaleDateString()} -{' '}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">Payment Status: {booking.paymentStatus}</p>
                </li>
              ))}
            </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;