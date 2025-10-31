// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import Landing from './pages/Landing';
import Login from './pages/Login';
import VendorKYC from './pages/VendorKYC';
import VendorDashboard from './pages/VendorDashboard';
import ConsigneeKYC from './pages/ConsigneeKYC';
import ConsigneeDashboard from './pages/ConsigneeDashboard';
import CreateShipment from './pages/CreateShipment';
import './styles/global.css';

// Protected Route Component
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                
                {/* Vendor Routes */}
                <Route 
                    path="/vendor/kyc" 
                    element={
                        <ProtectedRoute>
                            <VendorKYC />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/vendor/dashboard" 
                    element={
                        <ProtectedRoute>
                            <VendorDashboard />
                        </ProtectedRoute>
                    } 
                />
                
                {/* Consignee Routes */}
                <Route 
                    path="/consignee/kyc" 
                    element={
                        <ProtectedRoute>
                            <ConsigneeKYC />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/consignee/dashboard" 
                    element={
                        <ProtectedRoute>
                            <ConsigneeDashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/consignee/create-shipment" 
                    element={
                        <ProtectedRoute>
                            <CreateShipment />
                        </ProtectedRoute>
                    } 
                />
                
                {/* Catch all - redirect to landing */}
                <Route path="*" element={<Navigate to="/landing" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
