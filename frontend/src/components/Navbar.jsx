// frontend/src/components/Navbar.jsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/landing');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="navbar navbar-desktop">
                <div className="navbar-container">
                    <div className="navbar-brand" onClick={() => navigate('/')}>
                        <span className="brand-icon">🚚</span>
                        <span className="brand-name">NammaSupply</span>
                    </div>

                    <div className="navbar-menu">
                        {user.role === 'vendor' ? (
                            <>
                                <button 
                                    className={`nav-link ${isActive('/vendor/dashboard') ? 'active' : ''}`}
                                    onClick={() => navigate('/vendor/dashboard')}
                                >
                                    <span className="nav-icon">📊</span>
                                    Dashboard
                                </button>
                                <button className="nav-link">
                                    <span className="nav-icon">🚛</span>
                                    My Trucks
                                </button>
                                <button className="nav-link">
                                    <span className="nav-icon">📋</span>
                                    Bookings
                                </button>
                            </>
                        ) : user.role === 'consignee' ? (
                            <>
                                <button 
                                    className={`nav-link ${isActive('/consignee/dashboard') ? 'active' : ''}`}
                                    onClick={() => navigate('/consignee/dashboard')}
                                >
                                    <span className="nav-icon">📊</span>
                                    Dashboard
                                </button>
                                <button className="nav-link">
                                    <span className="nav-icon">📦</span>
                                    Shipments
                                </button>
                                <button className="nav-link">
                                    <span className="nav-icon">🚚</span>
                                    Track
                                </button>
                            </>
                        ) : null}
                    </div>

                    <div className="navbar-actions">
                        {user.name ? (
                            <>
                                <div className="user-profile">
                                    <div className="user-avatar">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="user-name">{user.name}</span>
                                </div>
                                <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button className="btn btn-primary btn-sm" onClick={() => navigate('/login')}>
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navbar */}
            <nav className="navbar navbar-mobile">
                {user.role === 'vendor' ? (
                    <>
                        <button 
                            className={`nav-item ${isActive('/vendor/dashboard') ? 'active' : ''}`}
                            onClick={() => navigate('/vendor/dashboard')}
                        >
                            <span className="nav-icon">📊</span>
                            <span className="nav-label">Home</span>
                        </button>
                        <button className="nav-item">
                            <span className="nav-icon">🚛</span>
                            <span className="nav-label">Trucks</span>
                        </button>
                        <button className="nav-item nav-item-primary">
                            <span className="nav-icon-lg">➕</span>
                        </button>
                        <button className="nav-item">
                            <span className="nav-icon">📋</span>
                            <span className="nav-label">Bookings</span>
                        </button>
                        <button className="nav-item">
                            <span className="nav-icon">👤</span>
                            <span className="nav-label">Profile</span>
                        </button>
                    </>
                ) : user.role === 'consignee' ? (
                    <>
                        <button 
                            className={`nav-item ${isActive('/consignee/dashboard') ? 'active' : ''}`}
                            onClick={() => navigate('/consignee/dashboard')}
                        >
                            <span className="nav-icon">📊</span>
                            <span className="nav-label">Home</span>
                        </button>
                        <button className="nav-item">
                            <span className="nav-icon">📦</span>
                            <span className="nav-label">Shipments</span>
                        </button>
                        <button className="nav-item nav-item-primary">
                            <span className="nav-icon-lg">➕</span>
                        </button>
                        <button className="nav-item">
                            <span className="nav-icon">🚚</span>
                            <span className="nav-label">Track</span>
                        </button>
                        <button className="nav-item">
                            <span className="nav-icon">👤</span>
                            <span className="nav-label">Profile</span>
                        </button>
                    </>
                ) : null}
            </nav>
        </>
    );
}

export default Navbar;
