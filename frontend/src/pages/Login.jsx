// frontend/src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Auth.css';

function Login() {
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role') || 'vendor';
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        mobile: '',
        password: '',
        name: '',
        role: role
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;
            if (isLogin) {
                response = await authAPI.login({ email: formData.email, password: formData.password });
            } else {
                response = await authAPI.signup(formData);
            }

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            if (role === 'vendor') {
                navigate('/vendor/kyc');
            } else {
                navigate('/consignee/kyc');
            }
        } catch (error) {
            alert('Authentication failed');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                <p className="auth-subtitle">
                    {role === 'vendor' ? '🚛 Truck Vendor' : '📦 Shipper'} Portal
                </p>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label>Mobile</label>
                            <input
                                type="tel"
                                value={formData.mobile}
                                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                <p className="auth-toggle">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Sign Up' : 'Login'}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;
