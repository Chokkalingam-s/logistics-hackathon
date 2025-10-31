// frontend/src/pages/ConsigneeDashboard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function ConsigneeDashboard() {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>📦 Shipper Dashboard</h1>
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
                    <p>Active Shipments</p>
                </div>
                <div className="stat-card">
                    <h3>0</h3>
                    <p>In Transit</p>
                </div>
                <div className="stat-card">
                    <h3>0</h3>
                    <p>Delivered</p>
                </div>
                <div className="stat-card">
                    <h3>₹0</h3>
                    <p>Total Savings</p>
                </div>
            </div>

            <div className="dashboard-actions">
                <button className="action-card" onClick={() => alert('Create Shipment (Coming soon!)')}>
                    <div className="action-icon">📦</div>
                    <h3>Create Shipment</h3>
                    <p>Post your cargo details</p>
                </button>

                <button className="action-card" onClick={() => alert('Active Shipments (Coming soon!)')}>
                    <div className="action-icon">🚚</div>
                    <h3>Active Shipments</h3>
                    <p>Track your cargo</p>
                </button>

                <button className="action-card" onClick={() => alert('History (Coming soon!)')}>
                    <div className="action-icon">📊</div>
                    <h3>Shipment History</h3>
                    <p>View past deliveries</p>
                </button>
            </div>
        </div>
    );
}

export default ConsigneeDashboard;
