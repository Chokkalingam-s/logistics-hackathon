// frontend/src/pages/Landing.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="landing">
            <div className="landing-hero">
                <div className="hero-content">
                    <div className="hero-icon">🚚</div>
                    <h1 className="hero-title">
                        Welcome to <span className="brand-highlight">NammaSupply</span>
                    </h1>
                    <p className="hero-subtitle">
                        India's smartest logistics platform. Save up to 35% on shipping costs by sharing truck space.
                    </p>
                </div>

                <div className="role-cards">
                    <div className="role-card" onClick={() => navigate('/login?role=vendor')}>
                        <div className="role-card-icon">🚛</div>
                        <h3 className="role-card-title">Truck Vendor</h3>
                        <p className="role-card-description">
                            Maximize earnings by filling empty truck space with shared loads
                        </p>
                        <ul className="role-card-features">
                            <li>✓ Earn more per trip</li>
                            <li>✓ Fill return journeys</li>
                            <li>✓ Instant payments</li>
                        </ul>
                        <button className="role-card-btn">
                            Get Started <span className="btn-arrow">→</span>
                        </button>
                    </div>

                    <div className="role-card role-card-featured" onClick={() => navigate('/login?role=consignee')}>
                        <div className="featured-badge">Popular</div>
                        <div className="role-card-icon">📦</div>
                        <h3 className="role-card-title">Shipper</h3>
                        <p className="role-card-description">
                            Save big on logistics by sharing truck space with other shippers
                        </p>
                        <ul className="role-card-features">
                            <li>✓ Save up to 35%</li>
                            <li>✓ Real-time tracking</li>
                            <li>✓ Verified vendors</li>
                        </ul>
                        <button className="role-card-btn">
                            Get Started <span className="btn-arrow">→</span>
                        </button>
                    </div>
                </div>

                <div className="trust-indicators">
                    <div className="trust-item">
                        <div className="trust-number">500+</div>
                        <div className="trust-label">Verified Vendors</div>
                    </div>
                    <div className="trust-item">
                        <div className="trust-number">10K+</div>
                        <div className="trust-label">Successful Deliveries</div>
                    </div>
                    <div className="trust-item">
                        <div className="trust-number">₹2Cr+</div>
                        <div className="trust-label">Savings Generated</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
