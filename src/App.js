// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './/pages/Login';
import Register from './/pages/Register';
import Dashboard from './/pages/Dashboard';
import ProfileView from './/pages/ProfileView';
import { AuthProvider } from './context/AuthContext';
import ChangePassword from './/pages/ChangePassword';




function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
