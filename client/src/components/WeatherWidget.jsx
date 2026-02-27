import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: 19.07, lon: 72.87 }); // Default: Mumbai
  const navigate = useNavigate();

  useEffect(() => {
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (err) => {
          console.log('Geolocation error, using default:', err);
          // Use default location if geolocation fails
        }
      );
    }
  }, []);

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await api.get('/weather/current', {
        params: {
          lat: location.lat,
          lon: location.lon
        }
      });

      setWeather(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '🌥️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-6">
        <div className="animate-pulse text-center">
          <p className="text-gray-600">मौसम जानकारी लोड हो रही है...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg shadow-md p-6 border border-red-200">
        <p className="text-red-700 text-sm">⚠️ {error}</p>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">🌤️ मौसम</h3>
        <button
          onClick={fetchWeather}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          अपडेट करें
        </button>
      </div>

      {/* Location */}
      <p className="text-sm text-gray-600 mb-3">{weather.location}</p>

      {/* Main Weather Display */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-5xl mb-2">{getWeatherIcon(weather.icon)}</div>
          <p className="text-3xl font-bold text-gray-800">{weather.temperature}°C</p>
          <p className="text-gray-600 capitalize">{weather.description}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-700">
            <p>अनुभव: <span className="font-semibold">{weather.feelsLike}°C</span></p>
            <p>आर्द्रता: <span className="font-semibold">{weather.humidity}%</span></p>
            <p>हवा: <span className="font-semibold">{weather.windSpeed} km/h</span></p>
          </div>
        </div>
      </div>

      {/* Farm Advice */}
      <div className="bg-white rounded-lg p-3 mb-4">
        <h4 className="font-semibold text-gray-800 mb-2 text-sm">🌾 कृषि सलाह:</h4>
        <ul className="space-y-1">
          {weather.farmingAdvice && weather.farmingAdvice.slice(0, 3).map((advice, idx) => (
            <li key={idx} className="text-xs text-gray-700">
              • {advice}
            </li>
          ))}
        </ul>
      </div>

      {/* View Forecast Button */}
      <button
        onClick={() => navigate('/farmer/weather')}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
      >
        📊 पूरा पूर्वानुमान देखें
      </button>
    </div>
  );
};

export default WeatherWidget;
