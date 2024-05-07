import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Send login request to backend
      const response = await axios.post('/api/login', { email, password });
      // Handle successful login
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleSignup = async () => {
    try {
      // Send signup request to backend
      const response = await axios.post('/api/signup', { email, password });
      // Handle successful signup
    } catch (error) {
      setError('Signup failed');
    }
  };

  return (
    <div className="login-container">
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="login-btn" onClick={handleLogin}>Login</button>
      <button className="signup-btn" onClick={handleSignup}>Signup</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
