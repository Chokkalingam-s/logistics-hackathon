// frontend/src/pages/SplashScreen.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/landing');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-screen">
            <div className="splash-content">
                <h1 className="splash-logo">🚚 LoadShare</h1>
                <p className="splash-tagline">Smart Logistics. Shared Savings.</p>
                <div className="splash-loader"></div>
            </div>
        </div>
    );
}

export default SplashScreen;
