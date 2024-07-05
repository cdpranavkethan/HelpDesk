import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../App.css";

function Analytics() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch initial search results and all articles on component mount
    

    // Retrieve token from localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      // Redirect to login page if token is not present
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <br /><br /><br />
      <h1 style={{ textAlign: "center" }}>User Analytics Overview</h1>
      <br /><br /><br /><br /><br /><br />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card text-center">
              <div className="card-header">
                <h2>Tickets</h2>
              </div>
              <div className="card-body">
                <p>
                  Retrieve analytics on ticket management (e.g., number of tickets,
                  average resolution time).
                </p>
              </div>
              <div className="card-footer">
                <Link to="/TicketManagementAnalytics" className="btn btn-primary">
                  View Ticket Analytics
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card text-center">
              <div className="card-header">
                <h2>Chat</h2>
              </div>
              <div className="card-body">
                <p>
                  Retrieve analytics on live chat sessions (e.g., number of chats,
                  average response time).
                </p>
              </div>
              <div className="card-footer">
                <Link to="/ChatAnalytics" className="btn btn-primary">
                  View Chat Analytics
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card text-center">
              <div className="card-header">
                <h2>Agent</h2>
              </div>
              <div className="card-body">
                <p>
                  Retrieve performance metrics for support agents (e.g., tickets
                  resolved, customer satisfaction).
                </p>
              </div>
              <div className="card-footer">
                <Link to="/AgentAnalytics" className="btn btn-primary">
                  View Agent Performance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br /><br /><br />
    </>
  );
}

export default Analytics;
