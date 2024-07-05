import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Fetch user role from local storage
        const storedRole = localStorage.getItem('role');
        if (storedRole) {
            setUserRole(storedRole);
        } else {
            // If role is not found in local storage, set a default role (e.g., 'customer')
            setUserRole('customer');
        }
    }, []);

    return (
        <div className="container" style={{ padding: '20px' }}>
            <div className="row" style={{ marginTop: '40px' }}>
                <div className="col-md-4" style={{ marginBottom: '20px' }}>
                    <div className="card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', transition: 'transform 0.2s' }}>
                        <div className="card-body" style={{ textAlign: 'center' }}>
                            <h5 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '15px' }}>Ticket Management</h5>
                            <p className="card-text" style={{ fontSize: '1rem', marginBottom: '20px' }}>Manage support tickets: create, view, update, and close tickets.</p>
                            {userRole === 'admin' ? (
                                <Link to="/admin/tickets" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '4px' }}>Go to Tickets</Link>
                            ) : (
                                <Link to="/tickets" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '4px' }}>Go to Tickets</Link>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-4" style={{ marginBottom: '20px' }}>
                    <div className="card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', transition: 'transform 0.2s' }}>
                        <div className="card-body" style={{ textAlign: 'center' }}>
                            <h5 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '15px' }}>Knowledge Base</h5>
                            <p className="card-text" style={{ fontSize: '1rem', marginBottom: '20px' }}>Access articles and FAQs to resolve common issues independently.</p>
                            {userRole === 'admin' ? (
                                <Link to="/admin/knowledge-base" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '4px' }}>Go to Knowledge Base</Link>
                            ) : (
                                <Link to="/knowledge-base" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '4px' }}>Go to Knowledge Base</Link>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-4" style={{ marginBottom: '20px' }}>
                    <div className="card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', transition: 'transform 0.2s' }}>
                        <div className="card-body" style={{ textAlign: 'center' }}>
                            <h5 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '15px' }}>Live Chat Support</h5>
                            <p className="card-text" style={{ fontSize: '1rem', marginBottom: '20px' }}>Engage in real-time chat with support agents.</p>
                            {userRole === 'admin' ? (
                                <Link to="/admin/live-chat" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '4px' }}>Go To Live Chat</Link>
                            ) : (
                                <Link to="/live-chat" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '4px' }}>Start Live Chat</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center" style={{ marginBottom: '20px' }}>
                    <div className="card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', transition: 'transform 0.2s', maxWidth: '600px', width: '100%' }}>
                        <div className="card-body" style={{ textAlign: 'center' }}>
                            <h5 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '15px' }}>Analytics</h5>
                            <p className="card-text" style={{ fontSize: '1rem', marginBottom: '20px' }}>View statistics and reports on support performance.</p>
                            <Link to="/analytics" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '4px' }}>View Analytics</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;
