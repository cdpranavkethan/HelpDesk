// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
  return (
    <header className="bg-primary py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-white text-decoration-none">
          <h1>HelpDesk Pro</h1>
        </Link>
        <nav>
          <ul className="list-inline mb-0">
            {isLoggedIn ? (
              <>
                <li className="list-inline-item">
                  <Link to="/profile" className="text-white text-decoration-none">Profile</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/logout" className="text-white text-decoration-none">Logout</Link>
                </li>
              </>
            ) : (
              <li className="list-inline-item">
                <Link to="/login" className="text-white text-decoration-none">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
