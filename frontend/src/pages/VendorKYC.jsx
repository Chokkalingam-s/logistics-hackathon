// frontend/src/pages/VendorKYC.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { vendorAPI } from '../services/api';
import './KYC.css';

function VendorKYC() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        businessName: '',
        gstin: '',
        pan: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await vendorAPI.submitKYC(formData);
            alert('KYC submitted successfully! ✅');
            navigate('/vendor/dashboard');
        } catch (error) {
            alert('KYC submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="kyc-page">
            <div className="kyc-container">
                <div className="kyc-header">
                    <div className="kyc-icon">🚛</div>
                    <h2 className="kyc-title">Vendor Verification</h2>
                    <p className="kyc-subtitle">
                        Complete your profile to start earning with NammaSupply
                    </p>
                </div>

                <div className="kyc-progress">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{width: '33%'}}></div>
                    </div>
                    <p className="progress-text">Step 1 of 3: Business Details</p>
                </div>

                <form onSubmit={handleSubmit} className="kyc-form">
                    <div className="form-group">
                        <label className="form-label">
                            Business Name
                            <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="businessName"
                            className="form-control"
                            value={formData.businessName}
                            onChange={handleChange}
                            placeholder="Enter your transport business name"
                            required
                        />
                        <p className="form-hint">Legal name as per registration</p>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            GSTIN Number
                            <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="gstin"
                            className="form-control"
                            value={formData.gstin}
                            onChange={handleChange}
                            placeholder="22AAAAA0000A1Z5"
                            maxLength={15}
                            pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
                            required
                        />
                        <p className="form-hint">15-character alphanumeric code</p>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            PAN Number
                            <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="pan"
                            className="form-control"
                            value={formData.pan}
                            onChange={handleChange}
                            placeholder="ABCDE1234F"
                            maxLength={10}
                            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                            style={{textTransform: 'uppercase'}}
                            required
                        />
                        <p className="form-hint">10-character alphanumeric code</p>
                    </div>

                    <div className="kyc-benefits">
                        <h4>✨ Why verify?</h4>
                        <ul>
                            <li>✓ Get verified badge on your profile</li>
                            <li>✓ Access premium features</li>
                            <li>✓ Higher booking rates</li>
                            <li>✓ Instant payment settlements</li>
                        </ul>
                    </div>

                    <div className="kyc-actions">
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-lg"
                            style={{width: '100%'}}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="btn-loading">
                                    <span className="spinner"></span>
                                    Verifying...
                                </span>
                            ) : (
                                'Submit & Continue →'
                            )}
                        </button>

                        <button 
                            type="button" 
                            className="btn btn-ghost"
                            style={{width: '100%', marginTop: '12px'}}
                            onClick={() => navigate('/vendor/dashboard')}
                        >
                            Skip for Now
                        </button>
                    </div>
                </form>

                <div className="kyc-footer">
                    <p>🔒 Your information is secure and encrypted</p>
                </div>
            </div>
        </div>
    );
}

export default VendorKYC;
