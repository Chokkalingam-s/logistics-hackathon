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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        mobile: '',
        password: '',
        name: '',
        role: role
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let response;
            if (isLogin) {
                response = await authAPI.login({ 
                    email: formData.email, 
                    password: formData.password 
                });
            } else {
                response = await authAPI.signup(formData);
            }

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Navigate based on KYC status
            if (response.data.user.kycStatus === 'verified') {
                if (role === 'vendor') {
                    navigate('/vendor/dashboard');
                } else {
                    navigate('/consignee/dashboard');
                }
            } else {
                if (role === 'vendor') {
                    navigate('/vendor/kyc');
                } else {
                    navigate('/consignee/kyc');
                }
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Authentication failed. Please try again.');
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
        <div className="auth-page">
            <div className="auth-background">
                <div className="auth-pattern"></div>
            </div>

            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-logo">
                        <span className="logo-icon">🚚</span>
                        <span className="logo-text">NammaSupply</span>
                    </div>
                    <div className="auth-role-badge">
                        {role === 'vendor' ? '🚛 Truck Vendor' : '📦 Shipper'}
                    </div>
                </div>

                <div className="auth-tabs">
                    <button 
                        className={`auth-tab ${isLogin ? 'active' : ''}`}
                        onClick={() => {
                            setIsLogin(true);
                            setError('');
                        }}
                    >
                        Login
                    </button>
                    <button 
                        className={`auth-tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => {
                            setIsLogin(false);
                            setError('');
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                {error && (
                    <div className="auth-error">
                        <span className="error-icon">⚠️</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">Mobile Number</label>
                            <input
                                type="tel"
                                name="mobile"
                                className="form-control"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="9876543210"
                                pattern="[0-9]{10}"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            minLength={6}
                            required
                        />
                    </div>

                    {isLogin && (
                        <div className="form-extras">
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="forgot-link">Forgot Password?</a>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="btn btn-primary btn-lg"
                        style={{width: '100%', marginTop: '24px'}}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="btn-loading">
                                <span className="spinner"></span>
                                Please wait...
                            </span>
                        ) : (
                            <span>
                                {isLogin ? 'Login' : 'Create Account'}
                                <span className="btn-arrow">→</span>
                            </span>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p className="auth-switch">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button 
                            className="switch-link"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>

                    <div className="auth-divider">
                        <span>or</span>
                    </div>

                    <button 
                        type="button"
                        className="btn btn-outline"
                        style={{width: '100%'}}
                        onClick={() => navigate('/landing')}
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
