// frontend/src/pages/Landing.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="landing">
            <div className="landing-hero">
                <h1>🚚 LoadShare</h1>
                <p>Reduce logistics costs by 30% with shared truck loads</p>
                
                <div className="landing-cards">
                    <div className="landing-card" onClick={() => navigate('/login?role=vendor')}>
                        <div className="card-icon">🚛</div>
                        <h3>Truck Vendor</h3>
                        <p>Maximize earnings by sharing truck space</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>

                    <div className="landing-card" onClick={() => navigate('/login?role=consignee')}>
                        <div className="card-icon">📦</div>
                        <h3>Shipper</h3>
                        <p>Save money on shipping costs</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
