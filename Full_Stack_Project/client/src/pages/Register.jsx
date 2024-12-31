import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Register = ({ navigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await API.post('/users/register', { name, email, password });
      alert('Registration successful! You can now log in.');
      navigateToLogin(); // Redirect to login after successful registration
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-700 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">
          Register
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Register
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <span
            className="text-indigo-600 cursor-pointer hover:underline"
            onClick={() => navigate('/')}
          >
            Log in here
          </span>.
        </p>
      </div>
    </div>
  );
};

export default Register;
