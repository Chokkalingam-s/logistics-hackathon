// frontend/src/pages/VendorDashboard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function VendorDashboard() {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>🚛 Vendor Dashboard</h1>
                <button className="btn btn-secondary" onClick={() => {
                    localStorage.clear();
                    navigate('/landing');
                }}>
                    Logout
                </button>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>0</h3>
                    <p>Active Trucks</p>
                </div>
                <div className="stat-card">
                    <h3>0</h3>
                    <p>Today's Routes</p>
                </div>
                <div className="stat-card">
                    <h3>0</h3>
                    <p>Booking Requests</p>
                </div>
                <div className="stat-card">
                    <h3>₹0</h3>
                    <p>Earnings This Month</p>
                </div>
            </div>

            <div className="dashboard-actions">
                <button className="action-card" onClick={() => alert('Add Truck (Coming soon!)')}>
                    <div className="action-icon">🚚</div>
                    <h3>Add Truck</h3>
                    <p>Register a new truck</p>
                </button>

                <button className="action-card" onClick={() => alert('Add Route (Coming soon!)')}>
                    <div className="action-icon">🗺️</div>
                    <h3>Add Today's Route</h3>
                    <p>Post where you're going</p>
                </button>

                <button className="action-card" onClick={() => alert('View Bookings (Coming soon!)')}>
                    <div className="action-icon">📋</div>
                    <h3>Booking Requests</h3>
                    <p>See incoming requests</p>
                </button>
            </div>
        </div>
    );
}

export default VendorDashboard;
