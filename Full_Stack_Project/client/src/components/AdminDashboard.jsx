import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
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
  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingVehicle({ ...editingVehicle, [name]: value });
  };

  const closePopup = () => {
    setPopupMessage('');
    setBookingHistory([]);
    setSelectedVehicle(null);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/admin/reviews')}>Review Management</button> {/* New Button */}

      {editingVehicle ? (
        <div>
          <h3>Edit Vehicle</h3>
          <input
            name="model"
            value={editingVehicle.model}
            onChange={handleInputChange}
            placeholder="Model"
          />
          <input
            name="year"
            type="number"
            value={editingVehicle.year}
            onChange={handleInputChange}
            placeholder="Year"
          />
          <input
            name="pricePerDay"
            type="number"
            value={editingVehicle.pricePerDay}
            onChange={handleInputChange}
            placeholder="Price Per Day"
          />
          <input
            name="type"
            value={editingVehicle.type}
            onChange={handleInputChange}
            placeholder="Type"
          />
          <input
            type="file"
            onChange={(e) => setEditingVehicle({ ...editingVehicle, image: e.target.files[0] })}
          />
          <button onClick={handleUpdate}>Update Vehicle</button>
          <button onClick={() => setEditingVehicle(null)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>Add Vehicle</h3>
          <input
            placeholder="Model"
            value={newVehicle.model}
            onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
          />
          <input
            placeholder="Year"
            type="number"
            value={newVehicle.year}
            onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
          />
          <input
            placeholder="Price Per Day"
            type="number"
            value={newVehicle.pricePerDay}
            onChange={(e) => setNewVehicle({ ...newVehicle, pricePerDay: e.target.value })}
          />
          <input
            placeholder="Type"
            value={newVehicle.type}
            onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
          />
          <input
            type="file"
            onChange={(e) => setNewVehicle({ ...newVehicle, image: e.target.files[0] })}
          />
          <button onClick={addVehicle}>Add Vehicle</button>
        </div>
      )}

      <h3>Manage Vehicles</h3>
      <div>
        {vehicles.map((vehicle) => (
          <div key={vehicle._id}>
            <img src={vehicle.image} alt={vehicle.model} style={{ width: '100px', height: '100px' }} />
            <h4>{vehicle.model}</h4>
            <p>{vehicle.pricePerDay} per day</p>
            <button onClick={() => handleEdit(vehicle)}>Edit</button>
            <button onClick={() => handleDelete(vehicle._id)}>Delete</button>
            <button onClick={() => fetchBookingHistory(vehicle._id)}>View Booking History</button>
          </div>
        ))}
      </div>

      {popupMessage && (
        <div className="popup">
          <p>{popupMessage}</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}

      {selectedVehicle && bookingHistory.length > 0 && (
        <div>
          <h3>Booking History</h3>
          <button onClick={closePopup}>Close</button>
          <ul>
            {bookingHistory.map((booking) => (
              <li key={booking._id}>
                <p>User: {booking.user?.name || 'N/A'} ({booking.user?.email || 'N/A'})</p>
                <p>
                  Dates: {new Date(booking.startDate).toLocaleDateString()} -{' '}
                  {new Date(booking.endDate).toLocaleDateString()}
                </p>
                <p>Payment Status: {booking.paymentStatus}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
