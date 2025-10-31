// frontend/src/pages/VendorDashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Dashboard.css';

function VendorDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [stats, setStats] = useState({
        activeTrucks: 0,
        todayRoutes: 0,
        bookingRequests: 0,
        monthlyEarnings: 0
    });

    useEffect(() => {
        // TODO: Fetch real stats from API
        setStats({
            activeTrucks: 3,
            todayRoutes: 2,
            bookingRequests: 5,
            monthlyEarnings: 45000
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
                                Here's what's happening with your business today
                            </p>
                        </div>
                        <div className="welcome-badge verified">
                            ✓ Verified Vendor
                        </div>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card stat-primary">
                            <div className="stat-icon">🚛</div>
                            <div className="stat-content">
                                <p className="stat-label">Active Trucks</p>
                                <h3 className="stat-value">{stats.activeTrucks}</h3>
                                <p className="stat-change positive">+1 this week</p>
                            </div>
                        </div>

                        <div className="stat-card stat-success">
                            <div className="stat-icon">🗺️</div>
                            <div className="stat-content">
                                <p className="stat-label">Today's Routes</p>
                                <h3 className="stat-value">{stats.todayRoutes}</h3>
                                <p className="stat-change">Available now</p>
                            </div>
                        </div>

                        <div className="stat-card stat-warning">
                            <div className="stat-icon">📋</div>
                            <div className="stat-content">
                                <p className="stat-label">Booking Requests</p>
                                <h3 className="stat-value">{stats.bookingRequests}</h3>
                                <p className="stat-change urgent">Pending review</p>
                            </div>
                        </div>

                        <div className="stat-card stat-info">
                            <div className="stat-icon">💰</div>
                            <div className="stat-content">
                                <p className="stat-label">This Month</p>
                                <h3 className="stat-value">₹{stats.monthlyEarnings.toLocaleString()}</h3>
                                <p className="stat-change positive">+12% vs last month</p>
                            </div>
                        </div>
                    </div>

                    <div className="quick-actions">
                        <h2 className="section-title">Quick Actions</h2>
                        
                        <div className="action-grid">
                            <button className="action-card action-primary">
                                <div className="action-content">
                                    <div className="action-icon">🚚</div>
                                    <div>
                                        <h3 className="action-title">Add New Truck</h3>
                                        <p className="action-desc">Register a new vehicle</p>
                                    </div>
                                </div>
                                <span className="action-arrow">→</span>
                            </button>

                            <button className="action-card action-secondary">
                                <div className="action-content">
                                    <div className="action-icon">🗺️</div>
                                    <div>
                                        <h3 className="action-title">Add Today's Route</h3>
                                        <p className="action-desc">Post where you're going</p>
                                    </div>
                                </div>
                                <span className="action-arrow">→</span>
                            </button>

                            <button className="action-card">
                                <div className="action-content">
                                    <div className="action-icon">📋</div>
                                    <div>
                                        <h3 className="action-title">View Bookings</h3>
                                        <p className="action-desc">{stats.bookingRequests} pending requests</p>
                                    </div>
                                </div>
                                <span className="action-arrow">→</span>
                            </button>

                            <button className="action-card">
                                <div className="action-content">
                                    <div className="action-icon">📊</div>
                                    <div>
                                        <h3 className="action-title">View Analytics</h3>
                                        <p className="action-desc">Track your performance</p>
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
                                    <p className="activity-title">Booking Completed</p>
                                    <p className="activity-desc">Chennai → Bangalore • TN01AB1234</p>
                                </div>
                                <span className="activity-time">2 hours ago</span>
                            </div>

                            <div className="activity-item">
                                <div className="activity-icon warning">!</div>
                                <div className="activity-content">
                                    <p className="activity-title">New Booking Request</p>
                                    <p className="activity-desc">Coimbatore → Madurai • 8 tons</p>
                                </div>
                                <span className="activity-time">4 hours ago</span>
                            </div>

                            <div className="activity-item">
                                <div className="activity-icon info">💰</div>
                                <div className="activity-content">
                                    <p className="activity-title">Payment Received</p>
                                    <p className="activity-desc">₹12,500 • Booking #12345</p>
                                </div>
                                <span className="activity-time">1 day ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VendorDashboard;
