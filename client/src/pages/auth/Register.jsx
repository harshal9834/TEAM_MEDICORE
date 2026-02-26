import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import api from '../../utils/api';
import registrationHandler from '../../utils/voice/registrationHandler';

const Register = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const roleFromState = location.state?.role || 'consumer';
  const languageFromState = location.state?.language;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: roleFromState
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Create refs for form fields (for voice assistant)
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const sectionSelectRef = useRef(null);

  // Register form fields with voice handler on mount
  useEffect(() => {
    if (nameInputRef.current && emailInputRef.current && passwordInputRef.current && sectionSelectRef.current) {
      registrationHandler.registerFormFields({
        nameInput: nameInputRef.current,
        emailInput: emailInputRef.current,
        passwordInput: passwordInputRef.current,
        sectionSelect: sectionSelectRef.current,
        setFormData: setFormData  // ✅ Pass state setter to update React state
      });
      console.log('[Register] Form fields registered with voice handler');
    }

    // Cleanup: unregister form fields when component unmounts
    return () => {
      registrationHandler.unregisterFormFields();
      console.log('[Register] Form fields unregistered from voice handler');
    };
  }, []);

  // Set language if it was selected in the previous step
  useEffect(() => {
    if (languageFromState && i18n && typeof i18n.changeLanguage === 'function' && languageFromState !== i18n.language) {
      i18n.changeLanguage(languageFromState);
    }
  }, [languageFromState, i18n]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || t('auth.registerError'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        <h2 className="text-3xl font-bold text-secondary-500 mb-6 text-center">{t('auth.register')} GOFaRm</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">{t('auth.name')}</label>
            <input
              ref={nameInputRef}
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary-500 focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">{t('auth.email')}</label>
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
            <label className="block text-gray-700 font-semibold mb-2">{t('auth.password')}</label>
            <input
              ref={passwordInputRef}
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary-500 focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">{t('auth.role')}</label>
            <select
              ref={sectionSelectRef}
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary-500 focus:outline-none transition-colors"
            >
              <option value="farmer">{t('auth.farmer')}</option>
              <option value="retailer">{t('auth.retailer')}</option>
              <option value="consumer">{t('auth.consumer')}</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-3 rounded-lg transition-colors duration-300"
          >
            {t('auth.register')}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          {t('auth.alreadyHaveAccount')}{' '}
          <Link to="/login" className="text-secondary-500 font-semibold hover:underline">
            {t('auth.login')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
