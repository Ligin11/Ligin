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
    <div>
      <h2>Register as Admin</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={adminData.name}
        onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={adminData.email}
        onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={adminData.password}
        onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterAdmin;
