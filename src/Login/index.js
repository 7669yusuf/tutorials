import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5002/api/login', { username, password });

      if (response.status === 200) {
        setSuccess('Login successful! Redirecting...');
        localStorage.setItem('token', response.data.token);

        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed. Try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="app-title">
          RAW <span className="trendz-highlight">Trendz</span>
        </h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="input-group">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
