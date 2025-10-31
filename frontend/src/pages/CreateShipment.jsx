// frontend/src/pages/CreateShipment.jsx

import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import Navbar from '../components/Navbar';
import { consigneeAPI } from '../services/api';
import './CreateShipment.css';

const GOOGLE_MAPS_API_KEY = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg';
const libraries = ['places'];

function PlacesAutocomplete({ onSelect, placeholder, value, onChange }) {
    const {
        ready,
        value: inputValue,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country: 'in' }
        },
        debounce: 300,
    });

    const handleInput = (e) => {
        setValue(e.target.value);
        onChange(e.target.value);
    };

    const handleSelect = async (description) => {
        setValue(description, false);
        clearSuggestions();
        onChange(description);

        try {
            const results = await getGeocode({ address: description });
            const { lat, lng } = await getLatLng(results[0]);
            onSelect({ lat, lng, address: description });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="autocomplete-wrapper">
            <input
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder={placeholder}
                className="form-control-compact"
            />
            {status === 'OK' && (
                <ul className="suggestions-dropdown">
                    {data.map((suggestion) => {
                        const {
                            place_id,
                            structured_formatting: { main_text, secondary_text },
                        } = suggestion;

                        return (
                            <li
                                key={place_id}
                                onClick={() => handleSelect(suggestion.description)}
                                className="suggestion-item"
                            >
                                <div className="suggestion-icon">📍</div>
                                <div>
                                    <div className="suggestion-main">{main_text}</div>
                                    <div className="suggestion-secondary">{secondary_text}</div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

function CreateShipment() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [directions, setDirections] = useState(null);
    const mapRef = useRef(null);
    const [multiStop, setMultiStop] = useState(false);
    const [intermediateStops, setIntermediateStops] = useState([]);
    
    const [formData, setFormData] = useState({
        pickupLocation: '',
        dropLocation: '',
        pickupCoords: null,
        dropCoords: null,
        intermediateStops: [],
        productCategory: '',
        customCategory: '',
        totalWeight: '',
        totalVolume: '',
        pickupDate: '',
        notes: ''
    });

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    const categories = [
        { value: 'edible_oils', label: 'Edible Oils', icon: '🛢️' },
        { value: 'textiles', label: 'Textiles', icon: '👕' },
        { value: 'electronics', label: 'Electronics', icon: '📱' },
        { value: 'fmcg', label: 'FMCG', icon: '📦' },
        { value: 'construction', label: 'Construction', icon: '🧱' },
        { value: 'agricultural', label: 'Agriculture', icon: '🌾' },
        { value: 'machinery', label: 'Machinery', icon: '⚙️' },
        { value: 'other', label: 'Other', icon: '✏️' }
    ];

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const handlePickupSelect = (place) => {
        setFormData(prev => ({
            ...prev,
            pickupLocation: place.address,
            pickupCoords: { lat: place.lat, lng: place.lng }
        }));

        if (formData.dropCoords) {
            calculateRoute();
        }
    };

    const handleDropSelect = (place) => {
        setFormData(prev => ({
            ...prev,
            dropLocation: place.address,
            dropCoords: { lat: place.lat, lng: place.lng }
        }));

        if (formData.pickupCoords) {
            calculateRoute();
        }
    };

    const handleIntermediateSelect = (place, index) => {
        const updatedStops = [...intermediateStops];
        updatedStops[index] = {
            address: place.address,
            coords: { lat: place.lat, lng: place.lng }
        };
        setIntermediateStops(updatedStops);
        setFormData(prev => ({ ...prev, intermediateStops: updatedStops }));
        
        if (formData.pickupCoords && formData.dropCoords) {
            calculateRoute();
        }
    };

    const addIntermediateStop = () => {
        setIntermediateStops([...intermediateStops, { address: '', coords: null }]);
    };

    const removeIntermediateStop = (index) => {
        const updatedStops = intermediateStops.filter((_, i) => i !== index);
        setIntermediateStops(updatedStops);
        setFormData(prev => ({ ...prev, intermediateStops: updatedStops }));
        
        if (formData.pickupCoords && formData.dropCoords) {
            calculateRoute();
        }
    };

    const calculateRoute = useCallback(() => {
        if (!window.google || !formData.pickupCoords || !formData.dropCoords) return;

        const waypoints = intermediateStops
            .filter(stop => stop.coords)
            .map(stop => ({
                location: stop.coords,
                stopover: true
            }));

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: formData.pickupCoords,
                destination: formData.dropCoords,
                waypoints: waypoints,
                optimizeWaypoints: true,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === 'OK') {
                    setDirections(result);
                    
                    if (mapRef.current) {
                        const bounds = new window.google.maps.LatLngBounds();
                        bounds.extend(formData.pickupCoords);
                        waypoints.forEach(wp => bounds.extend(wp.location));
                        bounds.extend(formData.dropCoords);
                        mapRef.current.fitBounds(bounds);
                    }
                }
            }
        );
    }, [formData.pickupCoords, formData.dropCoords, intermediateStops]);

    const handleCategorySelect = (category) => {
        setFormData({ ...formData, productCategory: category });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (currentStep === 1 && (!formData.pickupLocation || !formData.dropLocation)) {
            alert('Please select both pickup and final drop locations');
            return;
        }
        if (currentStep === 2 && !formData.productCategory) {
            alert('Please select a category');
            return;
        }
        if (currentStep === 2 && formData.productCategory === 'other' && !formData.customCategory) {
            alert('Please specify the product category');
            return;
        }
        if (currentStep === 3 && (!formData.totalWeight || !formData.totalVolume)) {
            alert('Please enter weight and volume');
            return;
        }
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => setCurrentStep(currentStep - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.pickupDate) {
            alert('Please select pickup date');
            return;
        }
        setLoading(true);
        try {
            const response = await consigneeAPI.createShipment(formData);
            alert('Shipment created! 🎉');
            navigate('/consignee/dashboard');
        } catch (error) {
            alert('Failed to create shipment');
        } finally {
            setLoading(false);
        }
    };

    const progressPercent = (currentStep / 4) * 100;

    const mapContainerStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '12px'
    };

    const center = formData.pickupCoords || { lat: 13.0827, lng: 80.2707 };

    if (!isLoaded) return <div>Loading Maps...</div>;

    return (
        <>
            <Navbar />
            <div className="create-shipment-page">
                <div className="shipment-container">
                    <div className="shipment-header-compact">
                        <button className="back-btn-compact" onClick={() => navigate('/consignee/dashboard')}>
                            ← Back
                        </button>
                        <h1 className="shipment-title-compact">Create Shipment</h1>
                        <div className="step-indicator-compact">Step {currentStep}/4</div>
                    </div>

                    <div className="progress-bar-compact">
                        <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                    </div>

                    <form onSubmit={handleSubmit} className="shipment-form-compact">
                        {/* STEP 1: LOCATIONS WITH MULTI-STOP */}
                        {currentStep === 1 && (
                            <div className="form-step-compact">
                                <div className="step-header-inline">
                                    <span className="step-icon-small">📍</span>
                                    <div>
                                        <h2 className="step-title-small">Route Details</h2>
                                        <p className="step-subtitle-small">Select pickup & delivery locations</p>
                                    </div>
                                </div>

                                {/* ROW 1: Pickup and Final Drop */}
                                <div className="location-row">
                                    <div className="form-group-compact">
                                        <label className="form-label-compact">Pickup Location *</label>
                                        <PlacesAutocomplete
                                            onSelect={handlePickupSelect}
                                            placeholder="Search pickup location..."
                                            value={formData.pickupLocation}
                                            onChange={(val) => setFormData({...formData, pickupLocation: val})}
                                        />
                                    </div>

                                    <div className="form-group-compact">
                                        <label className="form-label-compact">Final Drop Location *</label>
                                        <PlacesAutocomplete
                                            onSelect={handleDropSelect}
                                            placeholder="Search final drop location..."
                                            value={formData.dropLocation}
                                            onChange={(val) => setFormData({...formData, dropLocation: val})}
                                        />
                                    </div>
                                </div>

                                {/* Multi-Stop Checkbox */}
                                <div className="multi-stop-section">
                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            checked={multiStop}
                                            onChange={(e) => {
                                                setMultiStop(e.target.checked);
                                                if (!e.target.checked) {
                                                    setIntermediateStops([]);
                                                    setFormData(prev => ({ ...prev, intermediateStops: [] }));
                                                    calculateRoute();
                                                }
                                            }}
                                        />
                                        <span className="checkbox-label">
                                            <strong>Multi-Location Dropping?</strong> 
                                            <span className="checkbox-hint">Add intermediate stops along the route</span>
                                        </span>
                                    </label>
                                </div>

                                {/* Intermediate Stops */}
                                {multiStop && (
                                    <div className="intermediate-stops">
                                        {intermediateStops.map((stop, index) => (
                                            <div key={index} className="intermediate-stop-item">
                                                <div className="stop-number">{index + 1}</div>
                                                <div className="stop-input-wrapper">
                                                    <PlacesAutocomplete
                                                        onSelect={(place) => handleIntermediateSelect(place, index)}
                                                        placeholder={`Stop ${index + 1} location...`}
                                                        value={stop.address}
                                                        onChange={(val) => {
                                                            const updated = [...intermediateStops];
                                                            updated[index] = { ...updated[index], address: val };
                                                            setIntermediateStops(updated);
                                                        }}
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    className="remove-stop-btn"
                                                    onClick={() => removeIntermediateStop(index)}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="add-stop-btn"
                                            onClick={addIntermediateStop}
                                        >
                                            + Add Stop
                                        </button>
                                    </div>
                                )}

                                {/* ROW 2: Map */}
                                <div className="map-container">
                                    <GoogleMap
                                        mapContainerStyle={mapContainerStyle}
                                        center={center}
                                        zoom={formData.pickupCoords ? 8 : 6}
                                        onLoad={onMapLoad}
                                        options={{
                                            streetViewControl: false,
                                            mapTypeControl: false,
                                        }}
                                    >
                                        {formData.pickupCoords && (
                                            <Marker 
                                                position={formData.pickupCoords} 
                                                label={{ text: "A", color: "white" }}
                                            />
                                        )}
                                        {intermediateStops.map((stop, index) => 
                                            stop.coords && (
                                                <Marker
                                                    key={index}
                                                    position={stop.coords}
                                                    label={{ text: (index + 1).toString(), color: "white" }}
                                                />
                                            )
                                        )}
                                        {formData.dropCoords && (
                                            <Marker 
                                                position={formData.dropCoords} 
                                                label={{ text: "B", color: "white" }}
                                            />
                                        )}
                                        {directions && <DirectionsRenderer directions={directions} />}
                                    </GoogleMap>
                                </div>

                                {directions && (
                                    <div className="route-info-compact">
                                        <span>📏 {directions.routes[0].legs.reduce((acc, leg) => acc + leg.distance.value, 0) / 1000} km</span>
                                        <span>⏱️ {Math.round(directions.routes[0].legs.reduce((acc, leg) => acc + leg.duration.value, 0) / 3600)} hrs</span>
                                        {intermediateStops.length > 0 && (
                                            <span>🛑 {intermediateStops.length} stop{intermediateStops.length > 1 ? 's' : ''}</span>
                                        )}
                                    </div>
                                )}

                                {/* ROW 3: Continue Button */}
                                <div className="step-actions-single">
                                    <button type="button" className="btn-compact btn-primary-compact" onClick={handleNext}>
                                        Continue →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: CATEGORY + NOTES */}
                        {currentStep === 2 && (
                            <div className="form-step-compact">
                                <div className="step-header-inline">
                                    <span className="step-icon-small">📦</span>
                                    <div>
                                        <h2 className="step-title-small">Product Category</h2>
                                        <p className="step-subtitle-small">Select cargo type & add notes</p>
                                    </div>
                                </div>

                                <div className="category-grid-compact">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.value}
                                            type="button"
                                            className={`category-card-compact ${
                                                formData.productCategory === cat.value ? 'selected' : ''
                                            }`}
                                            onClick={() => handleCategorySelect(cat.value)}
                                        >
                                            <span className="category-icon-compact">{cat.icon}</span>
                                            <span className="category-label-compact">{cat.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Custom Category Input (when Other is selected) */}
                                {formData.productCategory === 'other' && (
                                    <div className="form-group-compact">
                                        <label className="form-label-compact">Specify Product Category *</label>
                                        <input
                                            type="text"
                                            name="customCategory"
                                            className="form-control-compact"
                                            value={formData.customCategory}
                                            onChange={handleChange}
                                            placeholder="e.g., Furniture, Chemicals, Medical Supplies..."
                                            required
                                        />
                                    </div>
                                )}

                                {/* Notes Section */}
                                <div className="form-group-compact">
                                    <label className="form-label-compact">
                                        Additional Notes (Optional)
                                        <span className="label-hint"> - Instructions for truck vendor</span>
                                    </label>
                                    <textarea
                                        name="notes"
                                        className="form-control-compact textarea-compact"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="e.g., Fragile items - handle with care, Loading dock closes at 5 PM, Contact person: John (9876543210)..."
                                        rows="3"
                                    />
                                    <p className="form-hint">
                                        Provide special instructions, handling requirements, or contact details
                                    </p>
                                </div>

                                <div className="step-actions-compact">
                                    <button type="button" className="btn-compact btn-secondary-compact" onClick={handleBack}>
                                        ← Back
                                    </button>
                                    <button type="button" className="btn-compact btn-primary-compact" onClick={handleNext}>
                                        Continue →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3 & 4: Keep existing code */}
                        {currentStep === 3 && (
                            <div className="form-step-compact">
                                <div className="step-header-inline">
                                    <span className="step-icon-small">⚖️</span>
                                    <div>
                                        <h2 className="step-title-small">Cargo Details</h2>
                                        <p className="step-subtitle-small">Weight & volume</p>
                                    </div>
                                </div>

                                <div className="form-row-compact">
                                    <div className="form-group-compact">
                                        <label className="form-label-compact">Weight (kg) *</label>
                                        <input
                                            type="number"
                                            name="totalWeight"
                                            className="form-control-compact"
                                            value={formData.totalWeight}
                                            onChange={handleChange}
                                            placeholder="5000"
                                            min="1"
                                            required
                                        />
                                    </div>

                                    <div className="form-group-compact">
                                        <label className="form-label-compact">Volume (m³) *</label>
                                        <input
                                            type="number"
                                            name="totalVolume"
                                            className="form-control-compact"
                                            value={formData.totalVolume}
                                            onChange={handleChange}
                                            placeholder="10"
                                            step="0.1"
                                            min="0.1"
                                            required
                                        />
                                    </div>
                                </div>

                                {formData.totalWeight && formData.totalVolume && (
                                    <div className="cargo-summary-compact">
                                        <div className="summary-item-compact">
                                            <span className="summary-label-compact">Total:</span>
                                            <span className="summary-value-compact">
                                                {formData.totalWeight}kg / {formData.totalVolume}m³
                                            </span>
                                        </div>
                                        <div className="summary-item-compact">
                                            <span className="summary-label-compact">Suggested:</span>
                                            <span className="summary-value-compact">
                                                {formData.totalWeight / 1000 > 10 ? '14T' : '10T'} Truck
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="step-actions-compact">
                                    <button type="button" className="btn-compact btn-secondary-compact" onClick={handleBack}>
                                        ← Back
                                    </button>
                                    <button type="button" className="btn-compact btn-primary-compact" onClick={handleNext}>
                                        Continue →
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="form-step-compact">
                                <div className="step-header-inline">
                                    <span className="step-icon-small">📅</span>
                                    <div>
                                        <h2 className="step-title-small">Pickup Date & Confirm</h2>
                                        <p className="step-subtitle-small">When to pickup?</p>
                                    </div>
                                </div>

                                <div className="form-group-compact">
                                    <label className="form-label-compact">Pickup Date *</label>
                                    <input
                                        type="date"
                                        name="pickupDate"
                                        className="form-control-compact"
                                        value={formData.pickupDate}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>

                                <div className="final-summary-compact">
                                    <h4 className="summary-title-compact">📋 Summary</h4>
                                    <div className="summary-grid-compact">
                                        <div className="summary-row-compact">
                                            <span>📍 Pickup:</span>
                                            <span>{formData.pickupLocation}</span>
                                        </div>
                                        {intermediateStops.map((stop, idx) => (
                                            <div key={idx} className="summary-row-compact">
                                                <span>🛑 Stop {idx + 1}:</span>
                                                <span>{stop.address}</span>
                                            </div>
                                        ))}
                                        <div className="summary-row-compact">
                                            <span>🏁 Final Drop:</span>
                                            <span>{formData.dropLocation}</span>
                                        </div>
                                        <div className="summary-row-compact">
                                            <span>📦 Product:</span>
                                            <span>
                                                {formData.productCategory === 'other' 
                                                    ? formData.customCategory 
                                                    : categories.find(c => c.value === formData.productCategory)?.label}
                                            </span>
                                        </div>
                                        <div className="summary-row-compact">
                                            <span>⚖️ Cargo:</span>
                                            <span>{formData.totalWeight}kg / {formData.totalVolume}m³</span>
                                        </div>
                                        <div className="summary-row-compact">
                                            <span>📅 Pickup:</span>
                                            <span>{formData.pickupDate || 'Not set'}</span>
                                        </div>
                                        {formData.notes && (
                                            <div className="summary-row-compact summary-notes">
                                                <span>📝 Notes:</span>
                                                <span>{formData.notes}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="step-actions-compact">
                                    <button type="button" className="btn-compact btn-secondary-compact" onClick={handleBack}>
                                        ← Back
                                    </button>
                                    <button type="submit" className="btn-compact btn-primary-compact" disabled={loading}>
                                        {loading ? 'Creating...' : 'Create & Find Trucks 🚚'}
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
