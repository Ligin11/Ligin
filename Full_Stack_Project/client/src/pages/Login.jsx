import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    try {
      const { data } = await API.post('/users/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('userEmail', data.user.email);
      setUser(data.user);

      // Redirect based on user role
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/vehicles');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-700 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4 animate-fade-in">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-500 mb-6">Sign in to continue</p>
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <span
              className="text-indigo-600 cursor-pointer hover:underline"
              onClick={() => navigate('/register')}
            >
              Register here
            </span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Not an admin?{' '}
            <Link
              to="/register-admin"
              className="text-indigo-600 hover:underline"
            >
              Register as Admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
