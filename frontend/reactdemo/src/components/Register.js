import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', { username: userName, password: password, email: email });
      setSuccessMessage(response.data.message);

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backdropFilter: 'blur(12px)', background: 'rgba(255, 255, 255, 0.8)' }}>
      <div className="card p-5" style={{ width: '400px', boxShadow: '0 8px 16px rgba(0,0,0,0.4)' }}>
        <h2 className="mb-4 text-center">Register</h2>
        {error && <p className="text-danger mb-4">{error}</p>}
        {successMessage && <p className="text-success mb-4">{successMessage}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
          <div className="mb-3 text-center">
            <Link to="/login" className="link-primary">Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
