import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const RegisterAdmin = () => {
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(null);
    try {
      await API.post('/users/register', { ...adminData, role: 'admin' });
      alert('Admin registered successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-700 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">
          Register as Admin
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        <input
          type="text"
          placeholder="Name"
          value={adminData.name}
          onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={adminData.email}
          onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={adminData.password}
          onChange={(e) =>
            setAdminData({ ...adminData, password: e.target.value })
          }
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterAdmin;
