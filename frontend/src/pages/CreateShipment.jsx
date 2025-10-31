// frontend/src/pages/CreateShipment.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { consigneeAPI } from '../services/api';
import './CreateShipment.css';

function CreateShipment() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        pickupLocation: '',
        dropLocation: '',
        productCategory: '',
        totalWeight: '',
        totalVolume: '',
        pickupDate: ''
    });

    const categories = [
        { value: 'edible_oils', label: 'Edible Oils & Liquids', icon: '🛢️' },
        { value: 'textiles', label: 'Textiles & Garments', icon: '👕' },
        { value: 'electronics', label: 'Electronics', icon: '📱' },
        { value: 'fmcg', label: 'FMCG & Packaged Goods', icon: '📦' },
        { value: 'construction', label: 'Construction Materials', icon: '🧱' },
        { value: 'agricultural', label: 'Agricultural Produce', icon: '🌾' },
        { value: 'machinery', label: 'Machinery & Equipment', icon: '⚙️' },
        { value: 'other', label: 'Other', icon: '📦' }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCategorySelect = (category) => {
        setFormData({
            ...formData,
            productCategory: category
        });
    };

    const handleNext = () => {
        if (currentStep === 1 && (!formData.pickupLocation || !formData.dropLocation)) {
            alert('Please fill in both pickup and drop locations');
            return;
        }
        if (currentStep === 2 && !formData.productCategory) {
            alert('Please select a product category');
            return;
        }
        if (currentStep === 3 && (!formData.totalWeight || !formData.totalVolume)) {
            alert('Please enter weight and volume');
            return;
        }
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.pickupDate) {
            alert('Please select pickup date');
            return;
        }

        setLoading(true);
        try {
            const response = await consigneeAPI.createShipment(formData);
            alert('Shipment created successfully! 🎉');
            navigate(`/consignee/find-trucks/${response.data.shipment.id}`);
        } catch (error) {
            alert('Failed to create shipment. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const progressPercent = (currentStep / 4) * 100;

    return (
        <>
            <Navbar />
            <div className="create-shipment-page">
                <div className="shipment-container">
                    <div className="shipment-header">
                        <button className="back-btn" onClick={() => navigate('/consignee/dashboard')}>
                            ← Back
                        </button>
                        <h1 className="shipment-title">Create Shipment</h1>
                        <div className="step-indicator">Step {currentStep} of 4</div>
                    </div>

                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                    </div>

                    <form onSubmit={handleSubmit} className="shipment-form">
                        {/* STEP 1: LOCATIONS */}
                        {currentStep === 1 && (
                            <div className="form-step step-active">
                                <div className="step-icon">📍</div>
                                <h2 className="step-title">Pickup & Drop Locations</h2>
                                <p className="step-subtitle">Where should we pick up and deliver your cargo?</p>

                                <div className="form-group">
                                    <label className="form-label">
                                        Pickup Location
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="pickupLocation"
                                        className="form-control"
                                        value={formData.pickupLocation}
                                        onChange={handleChange}
                                        placeholder="e.g., Chennai, Tamil Nadu"
                                        required
                                    />
                                    <p className="form-hint">Enter city or specific address</p>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        Drop Location
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="dropLocation"
                                        className="form-control"
                                        value={formData.dropLocation}
                                        onChange={handleChange}
                                        placeholder="e.g., Bangalore, Karnataka"
                                        required
                                    />
                                    <p className="form-hint">Enter destination city or address</p>
                                </div>

                                <div className="route-summary">
                                    <div className="route-visual">
                                        <div className="route-point start">
                                            <span className="point-icon">📍</span>
                                            <span className="point-label">
                                                {formData.pickupLocation || 'Pickup'}
                                            </span>
                                        </div>
                                        <div className="route-line"></div>
                                        <div className="route-point end">
                                            <span className="point-icon">📍</span>
                                            <span className="point-label">
                                                {formData.dropLocation || 'Drop'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button type="button" className="btn btn-primary btn-lg" onClick={handleNext}>
                                    Continue →
                                </button>
                            </div>
                        )}

                        {/* STEP 2: PRODUCT CATEGORY */}
                        {currentStep === 2 && (
                            <div className="form-step step-active">
                                <div className="step-icon">📦</div>
                                <h2 className="step-title">Product Category</h2>
                                <p className="step-subtitle">What type of cargo are you shipping?</p>

                                <div className="category-grid">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.value}
                                            type="button"
                                            className={`category-card ${
                                                formData.productCategory === cat.value ? 'selected' : ''
                                            }`}
                                            onClick={() => handleCategorySelect(cat.value)}
                                        >
                                            <span className="category-icon">{cat.icon}</span>
                                            <span className="category-label">{cat.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="step-actions">
                                    <button type="button" className="btn btn-secondary" onClick={handleBack}>
                                        ← Back
                                    </button>
                                    <button type="button" className="btn btn-primary btn-lg" onClick={handleNext}>
                                        Continue →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: WEIGHT & VOLUME */}
                        {currentStep === 3 && (
                            <div className="form-step step-active">
                                <div className="step-icon">⚖️</div>
                                <h2 className="step-title">Cargo Details</h2>
                                <p className="step-subtitle">How much cargo do you have?</p>

                                <div className="form-group">
                                    <label className="form-label">
                                        Total Weight (kg)
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="totalWeight"
                                        className="form-control"
                                        value={formData.totalWeight}
                                        onChange={handleChange}
                                        placeholder="e.g., 5000"
                                        min="1"
                                        required
                                    />
                                    <p className="form-hint">
                                        Enter total weight in kilograms
                                        {formData.totalWeight && (
                                            <strong> = {(formData.totalWeight / 1000).toFixed(2)} tons</strong>
                                        )}
                                    </p>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        Total Volume (cubic meters)
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="totalVolume"
                                        className="form-control"
                                        value={formData.totalVolume}
                                        onChange={handleChange}
                                        placeholder="e.g., 10"
                                        step="0.1"
                                        min="0.1"
                                        required
                                    />
                                    <p className="form-hint">Enter total volume in cubic meters (m³)</p>
                                </div>

                                {formData.totalWeight && formData.totalVolume && (
                                    <div className="cargo-summary">
                                        <h4>📊 Cargo Summary</h4>
                                        <div className="summary-grid">
                                            <div className="summary-item">
                                                <span className="summary-label">Weight:</span>
                                                <span className="summary-value">
                                                    {formData.totalWeight} kg ({(formData.totalWeight / 1000).toFixed(2)} tons)
                                                </span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="summary-label">Volume:</span>
                                                <span className="summary-value">{formData.totalVolume} m³</span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="summary-label">Suggested Truck:</span>
                                                <span className="summary-value">
                                                    {formData.totalWeight / 1000 > 10 ? '14-Ton' : '10-Ton'} Truck
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="step-actions">
                                    <button type="button" className="btn btn-secondary" onClick={handleBack}>
                                        ← Back
                                    </button>
                                    <button type="button" className="btn btn-primary btn-lg" onClick={handleNext}>
                                        Continue →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: PICKUP DATE & CONFIRM */}
                        {currentStep === 4 && (
                            <div className="form-step step-active">
                                <div className="step-icon">📅</div>
                                <h2 className="step-title">Pickup Date & Confirm</h2>
                                <p className="step-subtitle">When should we pick up your cargo?</p>

                                <div className="form-group">
                                    <label className="form-label">
                                        Pickup Date
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="pickupDate"
                                        className="form-control"
                                        value={formData.pickupDate}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>

                                <div className="final-summary">
                                    <h4>📋 Shipment Summary</h4>
                                    <div className="summary-card">
                                        <div className="summary-row">
                                            <span className="summary-icon">📍</span>
                                            <div>
                                                <div className="summary-label">Route</div>
                                                <div className="summary-value">
                                                    {formData.pickupLocation} → {formData.dropLocation}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="summary-row">
                                            <span className="summary-icon">📦</span>
                                            <div>
                                                <div className="summary-label">Product</div>
                                                <div className="summary-value">
                                                    {categories.find((c) => c.value === formData.productCategory)?.label}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="summary-row">
                                            <span className="summary-icon">⚖️</span>
                                            <div>
                                                <div className="summary-label">Cargo</div>
                                                <div className="summary-value">
                                                    {formData.totalWeight} kg / {formData.totalVolume} m³
                                                </div>
                                            </div>
                                        </div>

                                        <div className="summary-row">
                                            <span className="summary-icon">📅</span>
                                            <div>
                                                <div className="summary-label">Pickup Date</div>
                                                <div className="summary-value">
                                                    {formData.pickupDate
                                                        ? new Date(formData.pickupDate).toLocaleDateString('en-IN', {
                                                              weekday: 'long',
                                                              year: 'numeric',
                                                              month: 'long',
                                                              day: 'numeric'
                                                          })
                                                        : 'Not selected'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="step-actions">
                                    <button type="button" className="btn btn-secondary" onClick={handleBack}>
                                        ← Back
                                    </button>
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                        {loading ? (
                                            <span className="btn-loading">
                                                <span className="spinner"></span>
                                                Creating...
                                            </span>
                                        ) : (
                                            'Create Shipment & Find Trucks 🚚'
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateShipment;
