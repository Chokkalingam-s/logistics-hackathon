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
import './styles/global.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/vendor/kyc" element={<VendorKYC />} />
                <Route path="/vendor/dashboard" element={<VendorDashboard />} />
                <Route path="/consignee/kyc" element={<ConsigneeKYC />} />
                <Route path="/consignee/dashboard" element={<ConsigneeDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
