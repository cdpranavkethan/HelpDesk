import React, { useState } from 'react';
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginSuccess = (token,role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username',username);
    localStorage.setItem('role',role);
    setSuccessMessage('Successfully logged in!');
    setIsLoggedIn(true);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { username, password });
      handleLoginSuccess(response.data.token,response.data.role);
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backdropFilter: 'blur(12px)', background: 'rgba(255, 255, 255, 0.8)' }}>
      <div className="card p-5" style={{ width: '400px', boxShadow: '0 8px 16px rgba(0,0,0,0.4)' }}>
        <h2 className="mb-4 text-center">Login</h2>
        {error && <p className="text-danger mb-4">{error}</p>}
        {successMessage && <p className="text-success mb-4">{successMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 d-grid">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
          <div className="mb-3 text-center">
            <Link to="/register" className="link-primary">Don't have an account? Register</Link>
          </div>
          <div className="text-center">
            <NavLink to="/" className="link-secondary">Back to Homepage</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
