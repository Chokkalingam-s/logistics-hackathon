// frontend/src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    signup: (data) => api.post('/auth/signup', data),
    login: (data) => api.post('/auth/login', data)
};

export const vendorAPI = {
    submitKYC: (data) => api.post('/vendor/kyc', data),
    addTruck: (data) => api.post('/vendor/trucks', data),
    addRoute: (data) => api.post('/vendor/routes', data),
    getMyTrucks: () => api.get('/vendor/trucks'),
    getBookingRequests: () => api.get('/vendor/booking-requests'),
    acceptBooking: (id) => api.post(`/vendor/bookings/${id}/accept`)
};

export const consigneeAPI = {
    submitKYC: (data) => api.post('/consignee/kyc', data),
    createShipment: (data) => api.post('/consignee/shipments', data),
    getMyShipments: () => api.get('/consignee/shipments'),
    getAvailableTrucks: (shipmentId) => api.get(`/consignee/shipments/${shipmentId}/matches`),
    bookTruck: (data) => api.post('/consignee/bookings', data)
};

export default api;
