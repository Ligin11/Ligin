import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import axios from 'axios';

const AdminDashboard = () => {
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

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data } = await API.get('/vehicles');
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'vehicle_preset'); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dnuwj6auu/image/upload`,
        formData
      );
      console.log(response.data.secure_url);
      return response.data.secure_url; // Cloudinary returns the uploaded image URL here
    } catch (error) {
      console.error('Error uploading image:', error);
      return '';
    }
  };

  const addVehicle = async () => {
    if (newVehicle.image) {
      const imageUrl = await handleImageUpload(newVehicle.image);
      newVehicle.image = imageUrl; // Set the uploaded Cloudinary URL
    }

    try {
      await API.post('/admin/vehicle', newVehicle);
      fetchVehicles();
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle); // Set the selected vehicle for editing
  };

  const handleDelete = async (vehicleId) => {
    try {
      await API.delete(`/vehicles/${vehicleId}`);
      alert('Vehicle deleted successfully!');
      fetchVehicles(); // Refresh vehicle list
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
      setEditingVehicle(null); // Clear editing state
      fetchVehicles(); // Refresh vehicle list
    } catch (error) {
      console.error('Error updating vehicle:', error);
      alert('Failed to update vehicle.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingVehicle({ ...editingVehicle, [name]: value });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;