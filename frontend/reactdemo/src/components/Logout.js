import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    // Update isLoggedIn state to false
    setIsLoggedIn(false);
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Logout</div>
            <div className="card-body">
              <p className="card-text">Are you sure you want to logout?</p>
              <button className="btn btn-danger me-2" onClick={handleLogout}>Logout</button>
              <Link to="/" className="btn btn-secondary">Cancel</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
