// frontend/src/pages/ConsigneeKYC.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './KYC.css';

function ConsigneeKYC() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        businessName: '',
        gstin: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert('KYC submitted! (Mock for now)');
        navigate('/consignee/dashboard');
    };

    return (
        <div className="kyc-page">
            <div className="kyc-container">
                <h2>📦 Shipper KYC Verification</h2>
                <p className="kyc-subtitle">Complete your profile to start shipping</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Business Name</label>
                        <input
                            type="text"
                            value={formData.businessName}
                            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                            placeholder="Enter your business name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>GSTIN</label>
                        <input
                            type="text"
                            value={formData.gstin}
                            onChange={(e) => setFormData({...formData, gstin: e.target.value})}
                            placeholder="22AAAAA0000A1Z5"
                            maxLength={15}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
                        Submit KYC
                    </button>

                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        style={{width: '100%', marginTop: '10px'}}
                        onClick={() => navigate('/consignee/dashboard')}
                    >
                        Skip for Now
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ConsigneeKYC;
