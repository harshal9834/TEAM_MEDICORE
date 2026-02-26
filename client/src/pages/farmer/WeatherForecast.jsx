import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherForecast = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: 19.07, lon: 72.87 }); // Default: Mumbai
  const [selectedDay, setSelectedDay] = useState(0);

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
        }
      );
    }
  }, []);

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      // Fetch current weather and forecast in parallel
      const [currentRes, forecastRes] = await Promise.all([
        axios.get('/api/weather/current', {
          params: { lat: location.lat, lon: location.lon }
        }),
        axios.get('/api/weather/forecast', {
          params: { lat: location.lat, lon: location.lon }
        })
      ]);

      setCurrentWeather(currentRes.data.data);
      setForecast(forecastRes.data.data.forecast);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
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

  const getConditionColor = (condition) => {
    const colors = {
      'Clear': 'bg-yellow-100 text-yellow-800',
      'Clouds': 'bg-gray-100 text-gray-800',
      'Rain': 'bg-blue-100 text-blue-800',
      'Thunderstorm': 'bg-purple-100 text-purple-800',
      'Snow': 'bg-cyan-100 text-cyan-800',
      'Mist': 'bg-gray-200 text-gray-700'
    };
    return colors[condition] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin text-5xl mb-4">⌛</div>
            <p className="text-gray-600">मौसम डेटा लोड हो रहा है...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">🌤️ मौसम पूर्वानुमान</h1>
          <p className="text-gray-700">5-दिवसीय विस्तृत मौसम और कृषि सलाह</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* Current Weather */}
        {currentWeather && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📍 वर्तमान मौसम</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Weather Icon and Main Info */}
              <div className="flex flex-col items-center justify-center border-r border-gray-200 col-span-1">
                <div className="text-7xl mb-4">{getWeatherIcon(currentWeather.icon)}</div>
                <p className="text-5xl font-bold text-gray-800">{currentWeather.temperature}°C</p>
                <p className="text-gray-600 capitalize text-lg mt-2">{currentWeather.description}</p>
                <p className="text-sm text-gray-500 mt-2">अनुभव: {currentWeather.feelsLike}°C</p>
              </div>

              {/* Location and Details */}
              <div className="col-span-1">
                <p className="text-xl font-semibold text-gray-800 mb-4">{currentWeather.location}</p>
                <div className="space-y-3 text-gray-700">
                  <p className="flex justify-between">
                    <span>💧 आर्द्रता:</span>
                    <span className="font-semibold">{currentWeather.humidity}%</span>
                  </p>
                  <p className="flex justify-between">
                    <span>💨 हवा की गति:</span>
                    <span className="font-semibold">{currentWeather.windSpeed} km/h</span>
                  </p>
                  <p className="flex justify-between">
                    <span>🧭 हवा की दिशा:</span>
                    <span className="font-semibold">{currentWeather.windDegree}°</span>
                  </p>
                  <p className="flex justify-between">
                    <span>🔽 दबाव:</span>
                    <span className="font-semibold">{currentWeather.pressure} hPa</span>
                  </p>
                  <p className="flex justify-between">
                    <span>👁️ दृश्यता:</span>
                    <span className="font-semibold">{(currentWeather.visibility / 1000).toFixed(1)} km</span>
                  </p>
                </div>
              </div>

              {/* Sun Times */}
              <div className="col-span-1 border-l border-gray-200 pl-8">
                <h3 className="font-semibold text-gray-800 mb-4">☀️ सूर्य की जानकारी</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">🌅 सूर्योदय</p>
                    <p className="text-lg font-semibold text-gray-800">{currentWeather.sunrise}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">🌇 सूर्यास्त</p>
                    <p className="text-lg font-semibold text-gray-800">{currentWeather.sunset}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Farming Advice */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🌾 कृषि सलाह</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentWeather.farmingAdvice && currentWeather.farmingAdvice.map((advice, idx) => (
                  <div key={idx} className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                    <p className="text-gray-800">{advice}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5-Day Forecast */}
        {forecast && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 5-दिवसीय पूर्वानुमान</h2>

            {/* Day Selection Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {forecast.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDay(idx)}
                  className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                    selectedDay === idx
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {day.date}
                </button>
              ))}
            </div>

            {/* Selected Day Details */}
            {forecast[selectedDay] && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {/* Min Temp */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                    <p className="text-gray-600 text-sm">न्यूनतम तापमान</p>
                    <p className="text-3xl font-bold text-blue-700">{forecast[selectedDay].minTemp.toFixed(1)}°C</p>
                  </div>

                  {/* Max Temp */}
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
                    <p className="text-gray-600 text-sm">अधिकतम तापमान</p>
                    <p className="text-3xl font-bold text-red-700">{forecast[selectedDay].maxTemp.toFixed(1)}°C</p>
                  </div>

                  {/* Humidity */}
                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4">
                    <p className="text-gray-600 text-sm">आर्द्रता</p>
                    <p className="text-3xl font-bold text-cyan-700">{forecast[selectedDay].humidity}%</p>
                  </div>

                  {/* Rainfall */}
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
                    <p className="text-gray-600 text-sm">वर्षा संभावना</p>
                    <p className="text-3xl font-bold text-indigo-700">{forecast[selectedDay].rainfall.toFixed(1)} mm</p>
                  </div>
                </div>

                {/* Condition Badge */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">मौसम की स्थिति</p>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{getWeatherIcon(forecast[selectedDay].icon)}</span>
                    <span className={`px-4 py-2 rounded-lg font-semibold ${getConditionColor(forecast[selectedDay].condition)}`}>
                      {forecast[selectedDay].description}
                    </span>
                  </div>
                </div>

                {/* Hourly Forecast */}
                <div className="">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">⏰ घंटे-दर-घंटे पूर्वानुमास</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                    {forecast[selectedDay].forecasts && forecast[selectedDay].forecasts.map((hourly, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition">
                        <p className="text-xs text-gray-600 mb-2">{hourly.time}</p>
                        <p className="text-2xl mb-1">🌤️</p>
                        <p className="font-semibold text-gray-800">{hourly.temp.toFixed(1)}°C</p>
                        <p className="text-xs text-gray-600 mt-1">💧 {hourly.humidity}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button
            onClick={fetchWeatherData}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            🔄 ताज़ा करें
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
