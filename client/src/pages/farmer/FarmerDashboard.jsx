import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const FarmerDashboard = () => {
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setWeatherLoading(true);
    try {
      let lat = 19.07, lon = 72.87;
      if (navigator.geolocation) {
        try {
          const pos = await new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej, { timeout: 3000 }));
          lat = pos.coords.latitude;
          lon = pos.coords.longitude;
        } catch (e) { /* use default */ }
      }
      const response = await api.get('/weather/current', { params: { lat, lon } });
      setWeather(response.data.data);
    } catch (err) {
      console.error('Weather fetch error:', err);
    } finally {
      setWeatherLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '🌥️',
      '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️',
    };
    return iconMap[iconCode] || '🌤️';
  };

  const stats = [
    { value: '12', label: 'My Products', color: '#059669', bg: '#ecfdf5', icon: 'fa-box' },
    { value: '5', label: 'Active Exchanges', color: '#d97706', bg: '#fffbeb', icon: 'fa-exchange-alt' },
    { value: '3', label: 'Labour Posts', color: '#7c3aed', bg: '#f5f3ff', icon: 'fa-hard-hat' },
    { value: 'Wheat', label: 'Trending Crop', color: '#2563eb', bg: '#eff6ff', icon: 'fa-seedling' },
  ];

  const quickActions = [
    { label: 'Add Product', icon: 'fa-plus-circle', link: '/farmer/products', cls: 'gf-action-btn-green' },
    { label: 'Post Exchange', icon: 'fa-exchange-alt', link: '/farmer/exchange/new', cls: 'gf-action-btn-amber' },
    { label: 'Post Labour Requirement', icon: 'fa-hard-hat', link: '/farmer/labour-tab', cls: 'gf-action-btn-purple' },
    { label: 'View Market AI', icon: 'fa-chart-line', link: '/farmer/market-ai', cls: 'gf-action-btn-blue' },
  ];

  const recentActivity = [
    { text: 'You added Organic Wheat (50 kg)', time: '2 hours ago', icon: 'fa-box', iconBg: '#ecfdf5', iconColor: '#059669' },
    { text: 'New exchange post nearby: Rice for Fertilizer', time: '4 hours ago', icon: 'fa-exchange-alt', iconBg: '#fffbeb', iconColor: '#d97706' },
    { text: 'Labour request: 5 workers needed in Nashik', time: '6 hours ago', icon: 'fa-hard-hat', iconBg: '#f5f3ff', iconColor: '#7c3aed' },
    { text: 'Wheat price up ₹120/qtl in Pune APMC', time: '1 day ago', icon: 'fa-chart-line', iconBg: '#eff6ff', iconColor: '#2563eb' },
  ];

  return (
    <div className="gf-page gf-animate-in">
      {/* Section 1: Compact Weather Card */}
      <div className="gf-section">
        {weatherLoading ? (
          <div className="gf-weather-compact">
            <div className="flex items-center gap-3">
              <div className="gf-skeleton" style={{ width: 40, height: 40 }}></div>
              <div>
                <div className="gf-skeleton" style={{ width: 100, height: 14, marginBottom: 6 }}></div>
                <div className="gf-skeleton" style={{ width: 60, height: 12 }}></div>
              </div>
            </div>
          </div>
        ) : weather ? (
          <div>
            <div className="gf-weather-compact">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getWeatherIcon(weather.icon)}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-800">{weather.temperature}°C</span>
                    <span className="text-sm text-gray-500 capitalize">{weather.description}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                    <i className="fas fa-map-marker-alt text-blue-400"></i>
                    <span>{weather.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">
                  <div>Humidity: <span className="font-semibold text-gray-700">{weather.humidity}%</span></div>
                  <div>Wind: <span className="font-semibold text-gray-700">{weather.windSpeed} km/h</span></div>
                </div>
              </div>
            </div>
            {weather.humidity > 80 && (
              <div className="gf-weather-alert" style={{ background: '#fef3c7', color: '#92400e' }}>
                <i className="fas fa-exclamation-triangle"></i>
                <span>High humidity — watch for fungal diseases</span>
              </div>
            )}
          </div>
        ) : (
          <div className="gf-weather-compact">
            <span className="text-sm text-gray-500">
              <i className="fas fa-cloud-sun mr-2"></i>Weather unavailable
            </span>
          </div>
        )}
      </div>

      {/* Section 2: Quick Stats Row */}
      <div className="gf-section">
        <div className="gf-section-title">
          <span className="gf-title-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
            <i className="fas fa-chart-pie"></i>
          </span>
          Quick Overview
        </div>
        <div className="gf-stats-row">
          {stats.map((stat, i) => (
            <div key={i} className="gf-stat-card">
              <div className="flex justify-center mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: stat.bg, color: stat.color }}
                >
                  <i className={`fas ${stat.icon}`}></i>
                </div>
              </div>
              <div className="gf-stat-value" style={{ color: stat.color }}>{stat.value}</div>
              <div className="gf-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Primary Quick Actions */}
      <div className="gf-section">
        <div className="gf-section-title">
          <span className="gf-title-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
            <i className="fas fa-bolt"></i>
          </span>
          Quick Actions
        </div>
        <div className="flex flex-col gap-3">
          {quickActions.map((action, i) => (
            <Link key={i} to={action.link} className={`gf-action-btn ${action.cls}`}>
              <div className="gf-action-icon">
                <i className={`fas ${action.icon}`}></i>
              </div>
              <span>{action.label}</span>
              <i className="fas fa-chevron-right ml-auto opacity-60 text-sm"></i>
            </Link>
          ))}
        </div>
      </div>

      {/* Section 4: Recent Activity Feed */}
      <div className="gf-section">
        <div className="gf-section-title">
          <span className="gf-title-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <i className="fas fa-clock"></i>
          </span>
          Recent Activity
        </div>
        <div className="gf-card">
          {recentActivity.map((item, i) => (
            <div key={i} className="gf-activity-item">
              <div className="gf-activity-icon" style={{ background: item.iconBg, color: item.iconColor }}>
                <i className={`fas ${item.icon}`}></i>
              </div>
              <div className="flex-1">
                <div className="gf-activity-text">{item.text}</div>
                <div className="gf-activity-time">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
