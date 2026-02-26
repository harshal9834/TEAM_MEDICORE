import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../utils/api';
import loginHandler from '../../utils/voice/loginHandler';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  // Create refs for form fields (for voice assistant)
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // Register form fields with voice handler on mount
  useEffect(() => {
    if (emailInputRef.current && passwordInputRef.current) {
      loginHandler.registerFormFields({
        emailInput: emailInputRef.current,
        passwordInput: passwordInputRef.current,
        setFormData: setFormData  // ✅ Pass state setter to update React state
      });
      console.log('[Login] Form fields registered with voice handler');
    }

    // Cleanup: unregister form fields when component unmounts
    return () => {
      loginHandler.unregisterFormFields();
      console.log('[Login] Form fields unregistered from voice handler');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', formData);
      setAuth(response.data.user, response.data.token);
      
      // Redirect based on user role
      const userRole = response.data.user.role;
      if (userRole === 'farmer') {
        navigate('/farmer/dashboard');
      } else if (userRole === 'retailer') {
        navigate('/retailer/options');
      } else if (userRole === 'consumer') {
        navigate('/consumer/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-secondary-500 mb-6 text-center">Login to GOFaRm</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              ref={emailInputRef}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary-500 focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              ref={passwordInputRef}
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary-500 focus:outline-none transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-3 rounded-lg transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-secondary-500 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
