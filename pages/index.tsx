import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`;

const WeatherCard = styled.div`
  margin: 10px;
`;

const TitleWrapper = styled.div`
  background-color: #1e6cff;
  padding: 30px;
`;

const Title = styled.h1`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 30px;
  border-radius: 15px;
  background-color: #1e6cff;
  color: white;
  width: 300px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  font-family: 'Poppins', sans-serif;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

const WeatherIcon = styled.img`
  width: 60px;
  height: 60px;
`;


const HomePage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();
    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=02525ccb316248bba62eb2e25911b795`;
    try {
      const res = await fetch(url);
      if (res.status === 204) {
        throw new Error('City not found');
      }

      const weatherData = await res.json();
      console.log(weatherData);
      if (city.trim() === '') {
        setError('Please enter a city');
        throw new Error('Empty Input');
      }
      if (!weatherData.data || weatherData.data.length === 0) {
        throw new Error('Failed to fetch weather data');
      }
      setWeather(weatherData.data[0]); 
      setError('');
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  console.log(weather.weather.icon);
  return (
    <div>
      <TitleWrapper>
        <Title>Weather App</Title>
      </TitleWrapper>
      <InputWrapper>
        <form onSubmit={fetchWeather}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            
          />
          <button type="submit">Get Weather</button>
        </form>
      </InputWrapper>
      {error && <p>{error}</p>}
      {weather && (
        <WeatherContainer>
          <h2>{weather.city_name}, {weather.country_code}</h2>
          <p>Temperature: {weather.temp}°C</p>
          <p>Humidity: {weather.rh}%</p>
          <p>Description: {weather.weather.description}</p>
          <WeatherIcon src={`/icons/${weather.weather.icon}.png`} alt="Icon" />
        </WeatherContainer>
      )}
    </div>
  );
  
};

export default HomePage;

