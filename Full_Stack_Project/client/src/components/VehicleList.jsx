import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import API from '../utils/api';

const VehicleList = ({handleLogout}) => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filters, setFilters] = useState({ type: '', maxPrice: 1000 });
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
    applyFilters();
  },[]);


  const fetchVehicles = async () => {
    try {
      const { data } = await API.get('/vehicles');
      setVehicles(data);
      setFilteredVehicles(data);
    } catch (error) {
      console.error(error);
    }
  };

  const applyFilters = () => {
    const { type, maxPrice } = filters;
    const filtered = vehicles.filter(
      (vehicle) =>
        (type === '' || vehicle.type.toLowerCase().includes(type.toLowerCase())) &&
        vehicle.pricePerDay <= maxPrice
    );
    setFilteredVehicles(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };


  return (
    <div>
      <button onClick={()=> navigate('/dashboard')}>Profile</button>
      <button onClick={handleLogout}>Logout</button>
      <h2>Available Vehicles</h2>
      <div>
        <input
          type="text"
          placeholder="Type (e.g., SUV, Sedan)"
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
        />
        
        <input
          type="number"
          placeholder="Max Price"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
      </div>
      <div>
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle._id}>
            <img src={vehicle.image} alt={vehicle.model} style={{ width: '100px', height: '100px' }} />
            <h4>{vehicle.model}</h4>
            <p>Price: {vehicle.pricePerDay} per day</p>
            <button onClick={() => setSelectedVehicle(vehicle)}>Book Now</button>
          </div>
        ))}
      </div>
      {selectedVehicle && (
        <div>
          <h3>Booking Form</h3>
          <BookingForm vehicle={selectedVehicle} />
          <button onClick={() => setSelectedVehicle(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default VehicleList;