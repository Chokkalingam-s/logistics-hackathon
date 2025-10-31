// frontend/src/components/Navbar.jsx

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef(null);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/landing');
    };

    const isActive = (path) => location.pathname === path;

    // Close profile menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                                    My Shipment
                                </button>
                                <button 
                                    className="nav-link"
                                    onClick={() => navigate('/consignee/create-shipment')}
                                >
                                    <span className="nav-icon">➕</span>
                                                            Create Shipment
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
                            <div className="profile-dropdown-wrapper" ref={profileMenuRef}>
                                <button 
                                    className="user-profile-btn"
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                >
                                    <div className="user-avatar">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="user-name">{user.name}</span>
                                    <span className="dropdown-arrow">{showProfileMenu ? '▲' : '▼'}</span>
                                </button>

                                {showProfileMenu && (
                                    <div className="profile-dropdown-menu">
                                        <div className="dropdown-header">
                                            <div className="dropdown-user-info">
                                                <div className="dropdown-avatar">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="dropdown-name">{user.name}</div>
                                                    <div className="dropdown-email">{user.email}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="dropdown-divider"></div>

                                        <button 
                                            className="dropdown-item"
                                            onClick={() => {
                                                setShowProfileMenu(false);
                                                navigate(user.role === 'vendor' ? '/vendor/dashboard' : '/consignee/dashboard');
                                            }}
                                        >
                                            <span className="dropdown-icon">📊</span>
                                            Dashboard
                                        </button>

                                        <button 
                                            className="dropdown-item"
                                            onClick={() => {
                                                setShowProfileMenu(false);
                                                alert('Profile settings coming soon!');
                                            }}
                                        >
                                            <span className="dropdown-icon">⚙️</span>
                                            Settings
                                        </button>

                                        <button 
                                            className="dropdown-item"
                                            onClick={() => {
                                                setShowProfileMenu(false);
                                                alert('Help & Support coming soon!');
                                            }}
                                        >
                                            <span className="dropdown-icon">❓</span>
                                            Help & Support
                                        </button>

                                        <div className="dropdown-divider"></div>

                                        <button 
                                            className="dropdown-item dropdown-item-danger"
                                            onClick={() => {
                                                setShowProfileMenu(false);
                                                handleLogout();
                                            }}
                                        >
                                            <span className="dropdown-icon">🚪</span>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
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
                        <button 
                            className="nav-item"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
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
        <button 
            className="nav-item nav-item-primary"
            onClick={() => navigate('/consignee/create-shipment')}
        >
            <span className="nav-icon-lg">➕</span>
        </button>
                        <button className="nav-item">
                            <span className="nav-icon">🚚</span>
                            <span className="nav-label">Track</span>
                        </button>
                        <button 
                            className="nav-item"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <span className="nav-icon">👤</span>
                            <span className="nav-label">Profile</span>
                        </button>
                    </>
                ) : null}

                {/* Mobile Profile Sheet */}
                {showProfileMenu && (
                    <>
                        <div 
                            className="mobile-overlay"
                            onClick={() => setShowProfileMenu(false)}
                        ></div>
                        <div className="mobile-profile-sheet">
                            <div className="sheet-header">
                                <h3>Profile</h3>
                                <button 
                                    className="sheet-close"
                                    onClick={() => setShowProfileMenu(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="sheet-user-info">
                                <div className="sheet-avatar">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="sheet-name">{user.name}</div>
                                    <div className="sheet-email">{user.email}</div>
                                </div>
                            </div>

                            <div className="sheet-menu">
                                <button 
                                    className="sheet-item"
                                    onClick={() => {
                                        setShowProfileMenu(false);
                                        navigate(user.role === 'vendor' ? '/vendor/dashboard' : '/consignee/dashboard');
                                    }}
                                >
                                    <span className="sheet-icon">📊</span>
                                    Dashboard
                                </button>

                                <button 
                                    className="sheet-item"
                                    onClick={() => {
                                        setShowProfileMenu(false);
                                        alert('Settings coming soon!');
                                    }}
                                >
                                    <span className="sheet-icon">⚙️</span>
                                    Settings
                                </button>

                                <button 
                                    className="sheet-item"
                                    onClick={() => {
                                        setShowProfileMenu(false);
                                        alert('Help coming soon!');
                                    }}
                                >
                                    <span className="sheet-icon">❓</span>
                                    Help & Support
                                </button>

                                <div className="sheet-divider"></div>

                                <button 
                                    className="sheet-item sheet-item-danger"
                                    onClick={() => {
                                        setShowProfileMenu(false);
                                        handleLogout();
                                    }}
                                >
                                    <span className="sheet-icon">🚪</span>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </nav>
        </>
    );
}

export default Navbar;
