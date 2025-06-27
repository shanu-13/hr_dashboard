// src/pages/ProfileView.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './profileview.css';
import { useAuth } from '../context/AuthContext';

const ProfileView = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: '',
        location: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleRemovePhoto = () => {
    setAvatar(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleChangePassword = () => {
    navigate('/change-password'); // Create this route and page
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <button onClick={() => navigate('/dashboard')}>← Back</button>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleChangePassword}>Change Password</button>
      </div>

      <div className="profile-card">
        <div className="avatar-wrapper" onClick={handleAvatarClick}>
          <img
            src={avatar || '/default-avatar.png'}
            alt="avatar"
            className="avatar"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {avatar && <button className="remove-btn" onClick={handleRemovePhoto}>Remove Photo</button>}
        </div>

        <div className="info-section">
          <h2>{formData.firstName} {formData.lastName}</h2>
          <p>{formData.email}</p>

          <form className="form-section" onSubmit={(e) => e.preventDefault()}>
            <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
            <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
            <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
            <button type="button" onClick={() => alert('Saved!')}>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
