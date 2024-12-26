import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState('');
    const [error, setError] = useState('');

    const API_KEY = "8ae1bdc15fc68600979af034a25b928d";

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherDataByCoordinates(lat, lon);
            },
            () => {
                setError('Please enable your location');
            }
        );
    }, []);

    const fetchWeatherDataByCoordinates = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            setWeather(response.data);
        } catch {
            setError('Unable to fetch weather data.');
        }
    };

    const fetchWeatherData = async () => {
        if (!location) {
            setError('Please enter a location');
            return;
        }
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
            );
            setWeather(response.data);
            setError('');
        } catch {
            setError('Location not found');
        }
    };

    return (
        <div className="container">
            <h1>Weather App</h1>
            <div className="inputContainer">
                <input
                    className="input"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                />
                <button className="button" onClick={fetchWeatherData}>
                    Get Weather
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            {weather && weather.main && weather.weather && (
                <div className="weatherInfo">
                    <h2>Weather in {weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Condition: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
