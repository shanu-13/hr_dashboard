// src/pages/AuthPage.js
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import '../styles/AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={`auth-page ${isLogin ? 'login-mode' : 'register-mode'}`}>
      <div className="form-container">
        {isLogin ? <Login /> : <Register />}
      </div>
      <div className="side-panel">
        <h2>{isLogin ? "Don't have an account?" : "Already registered?"}</h2>
        <p>{isLogin ? "Register now to get started!" : "Login to access your dashboard."}</p>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
