import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);
    const [searchHistory, setSearchHistory] = useState([]);
    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }
            setWeatherData({
                humidity: data.main.humidity,
                temperature: data.main.temp,
                location: data.name
            });
            setSearchHistory((prevHistory) => {
                const updatedHistory = [city, ...prevHistory.filter(item => item !== city)];
                return updatedHistory.slice(0, 10);
            });
        } catch (error) {
            console.error("Error in fetching weather data:", error);
        }
    };
    useEffect(() => {
        search("Chennai");
    }, []);
    return (
        <div className='Weather'>
            <div className='weather-display'>
                <div className='title'>
                    <h1>Weather App</h1>
                    <h1>☀️ 🌧️ 🌩️ 🌨️ ☔</h1>
                    <h3>Never Let Weather Surprise You Again!</h3>
                </div>
                <div className='searchbar'>
                    <input ref={inputRef} type='text' placeholder='Enter Your City Name' />
                    <button onClick={() => search(inputRef.current.value)} className='submit'>Submit</button>
                </div>
                {weatherData && (
                    <div className="weatherdata">
                        <div className="wet">
                            <p className='temp'>{weatherData.temperature}°C</p>
                            <p className='city'>{weatherData.location}</p>
                        </div>
                        <div className="hum">
                            <p>{weatherData.humidity}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="search-history">
                <h1>Last 10 Searched Locations</h1>
                <ul>
                    {searchHistory.map((city, index) => (
                        <li key={index} onClick={() => search(city)} className='history-item'>
                            {city}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Weather;
