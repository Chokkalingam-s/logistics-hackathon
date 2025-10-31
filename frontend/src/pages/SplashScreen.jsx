// frontend/src/pages/SplashScreen.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/landing');
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-screen">
            <div className="splash-content">
                <div className="splash-icon-wrapper">
                    <span className="splash-icon">🚚</span>
                </div>
                <h1 className="splash-brand">NammaSupply</h1>
                <p className="splash-tagline">Smart Logistics. Shared Savings.</p>
                <div className="splash-loader-container">
                    <div className="splash-loader"></div>
                </div>
            </div>
        </div>
    );
}

export default SplashScreen;
