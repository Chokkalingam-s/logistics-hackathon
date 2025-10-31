// frontend/src/pages/ConsigneeDashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Dashboard.css';

function ConsigneeDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [stats, setStats] = useState({
        activeShipments: 0,
        inTransit: 0,
        delivered: 0,
        totalSavings: 0
    });

    useEffect(() => {
        // TODO: Fetch real stats from API
        setStats({
            activeShipments: 4,
            inTransit: 2,
            delivered: 12,
            totalSavings: 52000
        });
    }, []);

    return (
        <>
            <Navbar />
            <div className="dashboard">
                <div className="dashboard-container">
                    <div className="dashboard-welcome">
                        <div>
                            <h1 className="welcome-title">
                                Welcome back, {user.name}! 👋
                            </h1>
                            <p className="welcome-subtitle">
                                Track your shipments and manage your logistics
                            </p>
                        </div>
                        <div className="welcome-badge verified">
                            ✓ Verified Shipper
                        </div>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card stat-primary">
                            <div className="stat-icon">📦</div>
                            <div className="stat-content">
                                <p className="stat-label">Active Shipments</p>
                                <h3 className="stat-value">{stats.activeShipments}</h3>
                                <p className="stat-change">Pending & Scheduled</p>
                            </div>
                        </div>

                        <div className="stat-card stat-warning">
                            <div className="stat-icon">🚚</div>
                            <div className="stat-content">
                                <p className="stat-label">In Transit</p>
                                <h3 className="stat-value">{stats.inTransit}</h3>
                                <p className="stat-change">Live tracking available</p>
                            </div>
                        </div>

                        <div className="stat-card stat-success">
                            <div className="stat-icon">✓</div>
                            <div className="stat-content">
                                <p className="stat-label">Delivered</p>
                                <h3 className="stat-value">{stats.delivered}</h3>
                                <p className="stat-change positive">This month</p>
                            </div>
                        </div>

                        <div className="stat-card stat-info">
                            <div className="stat-icon">💰</div>
                            <div className="stat-content">
                                <p className="stat-label">Total Savings</p>
                                <h3 className="stat-value">₹{stats.totalSavings.toLocaleString()}</h3>
                                <p className="stat-change positive">vs Market rates</p>
                            </div>
                        </div>
                    </div>

                    <div className="quick-actions">
                        <h2 className="section-title">Quick Actions</h2>
                        
                        <div className="action-grid">
                            <button className="action-card action-primary">
                                <div className="action-content">
                                    <div className="action-icon">📦</div>
                                    <div>
                                        <h3 className="action-title">Create Shipment</h3>
                                        <p className="action-desc">Post your cargo details</p>
                                    </div>
                                </div>
                                <span className="action-arrow">→</span>
                            </button>

                            <button className="action-card action-secondary">
                                <div className="action-content">
                                    <div className="action-icon">🔍</div>
                                    <div>
                                        <h3 className="action-title">Find Trucks</h3>
                                        <p className="action-desc">Browse available routes</p>
                                    </div>
                                </div>
                                <span className="action-arrow">→</span>
                            </button>

                            <button className="action-card">
                                <div className="action-content">
                                    <div className="action-icon">📍</div>
                                    <div>
                                        <h3 className="action-title">Track Shipments</h3>
                                        <p className="action-desc">{stats.inTransit} in transit now</p>
                                    </div>
                                </div>
                                <span className="action-arrow">→</span>
                            </button>

                            <button className="action-card">
                                <div className="action-content">
                                    <div className="action-icon">📊</div>
                                    <div>
                                        <h3 className="action-title">View Reports</h3>
                                        <p className="action-desc">Analytics & insights</p>
                                    </div>
                                </div>
                                <span className="action-arrow">→</span>
                            </button>
                        </div>
                    </div>

                    <div className="recent-activity">
                        <h2 className="section-title">Recent Activity</h2>
                        
                        <div className="activity-list">
                            <div className="activity-item">
                                <div className="activity-icon success">✓</div>
                                <div className="activity-content">
                                    <p className="activity-title">Shipment Delivered</p>
                                    <p className="activity-desc">Chennai → Madurai • 5 tons • Booking #12345</p>
                                </div>
                                <span className="activity-time">1 hour ago</span>
                            </div>

                            <div className="activity-item">
                                <div className="activity-icon warning">🚚</div>
                                <div className="activity-content">
                                    <p className="activity-title">Shipment In Transit</p>
                                    <p className="activity-desc">Bangalore → Coimbatore • Expected arrival: 6 PM</p>
                                </div>
                                <span className="activity-time">3 hours ago</span>
                            </div>

                            <div className="activity-item">
                                <div className="activity-icon info">📋</div>
                                <div className="activity-content">
                                    <p className="activity-title">Booking Confirmed</p>
                                    <p className="activity-desc">Trichy → Chennai • Pickup: Tomorrow 8 AM</p>
                                </div>
                                <span className="activity-time">5 hours ago</span>
                            </div>

                            <div className="activity-item">
                                <div className="activity-icon success">💰</div>
                                <div className="activity-content">
                                    <p className="activity-title">You Saved ₹4,500</p>
                                    <p className="activity-desc">Shared load discount on last booking</p>
                                </div>
                                <span className="activity-time">1 day ago</span>
                            </div>
                        </div>
                    </div>

                    <div className="savings-banner">
                        <div className="savings-content">
                            <div className="savings-icon">🎉</div>
                            <div>
                                <h3 className="savings-title">Great job saving money!</h3>
                                <p className="savings-text">
                                    You've saved ₹{stats.totalSavings.toLocaleString()} compared to market rates. 
                                    Keep using NammaSupply to save even more!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConsigneeDashboard;
