import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data } = await API.get('/users/profile');
    setProfile(data);
  };

  const updateProfile = async () => {
    await API.put('/users/profile', profile);
    alert('Profile updated successfully!');
  };

    const handleLogout = () => {
    // Clear local storage and navigate to login page
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <input
        placeholder="Name"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />
      <button onClick={updateProfile}>Save</button>
    </div>
  );
};

export default Profile;
