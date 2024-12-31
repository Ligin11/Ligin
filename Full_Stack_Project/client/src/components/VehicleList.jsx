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
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showVehicleReviews, setShowVehicleReviews] = useState(false);
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
      const matchesSearch =
        searchQuery === '' || vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
        type === '' || vehicle.type.toLowerCase().includes(type.toLowerCase());
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-500 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <h2 className="text-3xl font-bold text-white mb-6">Available Vehicles</h2>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by model"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Type (e.g., SUV, Sedan)"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="number"
            placeholder="Min Price"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="number"
            placeholder="Max Price"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Vehicle List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle) => (
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
                <p className="text-gray-600">Type: {vehicle.type}</p>
                <p className="text-gray-600">Price: ₹{vehicle.pricePerDay} per day</p>
                <div className="space-x-4">
                  <button
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setShowBookingForm(true);
                      setShowVehicleReviews(false);
                    }}
                    className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setShowVehicleReviews(true);
                      setShowBookingForm(false);
                    }}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Vehicle Reviews
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center text-lg">No vehicles match your criteria.</p>
          )}
        </div>

        {/* Booking Form */}
        {showBookingForm && selectedVehicle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className='bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] p-3'>
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">Booking Form</h3>
            <BookingForm vehicle={selectedVehicle} />
            <button
              onClick={() => setShowBookingForm(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
            </div>
          </div>
        )}

        {/* Vehicle Reviews */}
        {showVehicleReviews && selectedVehicle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className='bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] p-3'>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Vehicle Reviews</h3>
            <VehicleReviews vehicleId={selectedVehicle._id} />
            <button
              onClick={() => setShowVehicleReviews(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
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

export default VehicleList;
