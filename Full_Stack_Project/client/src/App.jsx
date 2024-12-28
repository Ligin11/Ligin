import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import VehicleList from './components/VehicleList';
import Profile from './pages/Profile';
import PaymentPage from './components/PaymentPage';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    setUser(null); // Reset user state
  };

  const isAuthenticated = !!user;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Login setUser={setUser} />
            ) : (
              <Navigate to={user?.role === 'admin' ? '/admin' : '/vehicles'} />
            )
          }
        />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />

        {isAuthenticated && user.role === 'user' && (
          <>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/vehicles" element={<VehicleList handleLogout={handleLogout} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment" element={<PaymentPage />} />
          </>
        )}

        {isAuthenticated && user.role === 'admin' && (
          <Route path="/admin" element={<AdminDashboard />} />
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
