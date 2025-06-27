// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: form.name,
      email: form.email,
      password: form.password
    };

    try {
      const res = await axios.post('http://localhost:5000/register', userData);
      setMessage(res.data.message);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage('Registration failed.');
    }
  };

  return (
    <div className="auth-background">
      <div className="register-container">
        <h2 className="register-heading">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          /><br />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          /><br />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          /><br />
          <button type="submit" className="register-button">Register</button>
        </form>
        {message && <p style={{ marginTop: '10px' }}>{message}</p>}
      </div>
    </div>
  );
};

export default Register;
