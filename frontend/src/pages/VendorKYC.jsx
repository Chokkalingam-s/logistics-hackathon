// frontend/src/pages/VendorKYC.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './KYC.css';

function VendorKYC() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        businessName: '',
        gstin: '',
        pan: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: API call
        alert('KYC submitted! (Mock for now)');
        navigate('/vendor/dashboard');
    };

    return (
        <div className="kyc-page">
            <div className="kyc-container">
                <h2>🚛 Vendor KYC Verification</h2>
                <p className="kyc-subtitle">Complete your profile to start earning</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Business Name</label>
                        <input
                            type="text"
                            value={formData.businessName}
                            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                            placeholder="Enter your transport business name"
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

                    <div className="form-group">
                        <label>PAN Number</label>
                        <input
                            type="text"
                            value={formData.pan}
                            onChange={(e) => setFormData({...formData, pan: e.target.value})}
                            placeholder="ABCDE1234F"
                            maxLength={10}
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
                        onClick={() => navigate('/vendor/dashboard')}
                    >
                        Skip for Now
                    </button>
                </form>
            </div>
        </div>
    );
}

export default VendorKYC;
