import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import VehicleReviews from './VehicleReviews';
import API from '../utils/api';

const VehicleList = ({ handleLogout }) => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filters, setFilters] = useState({ type: '', minPrice: '', maxPrice: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery, vehicles]);

  const fetchVehicles = async () => {
    try {
      const { data } = await API.get('/vehicles');
      setVehicles(data);
      setFilteredVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const applyFilters = () => {
    const { type, minPrice, maxPrice } = filters;
    const filtered = vehicles.filter((vehicle) => {
      const matchesSearch = searchQuery === '' || vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = type === '' || vehicle.type.toLowerCase().includes(type.toLowerCase());
      const matchesPrice =
        (minPrice === '' || vehicle.pricePerDay >= Number(minPrice)) &&
        (maxPrice === '' || vehicle.pricePerDay <= Number(maxPrice));
      return matchesSearch && matchesType && matchesPrice;
    });
    setFilteredVehicles(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <button onClick={() => navigate('/dashboard')}>Profile</button>
      <button onClick={handleLogout}>Logout</button>
      <h2>Available Vehicles</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by model"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Filters */}
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
          placeholder="Min Price"
          name="minPrice"
          value={filters.minPrice}
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

      {/* Vehicle List */}
      <div>
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <div key={vehicle._id}>
              <img src={vehicle.image} alt={vehicle.model} style={{ width: '100px', height: '100px' }} />
              <h4>{vehicle.model}</h4>
              <p>Type: {vehicle.type}</p>
              <p>Price: {vehicle.pricePerDay} per day</p>
              <button onClick={() => setSelectedVehicle(vehicle)}>Book Now</button>
            </div>
          ))
        ) : (
          <p>No vehicles match your criteria.</p>
        )}
      </div>

      {/* Booking Form */}
      {selectedVehicle && (
        <div>
          <h3>Booking Form</h3>
          <BookingForm vehicle={selectedVehicle} />
          <VehicleReviews vehicleId={selectedVehicle._id} />
          <button onClick={() => setSelectedVehicle(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default VehicleList;
