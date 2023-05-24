import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
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
  margin: 0 auto;
  margin-top: 20px;
  padding: 80px;
  padding-top: 60px;
  border-radius: 15px;
  background-color: #0057FF;
  color: white;
  width: 300px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  font-family: 'Open Sans', sans-serif;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.7);
  }
`;

const ForecastContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 20px;
  padding: 80px;
  padding-top: 60px;
  border-radius: 15px;
  background-color: #0057FF;
  color: white;
  width: 300px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  font-family: 'Open Sans', sans-serif;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.7);
  }
  `;

const WeatherIcon = styled.img`
  width: 60px;
  height: 60px;
`;

const ErrorContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 20px;
padding-top: 20px;
`;

const ErrorMessage = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding: 10px;
border-radius: 10px;
background-color: #ff5353;
color: white;
font-weight: bold;
font-family: 'Open Sans', sans-serif;
`;

const CrossIcon = styled.span`
  margin-left: 5px;
  margin-right: 10px;
  font-size: 26px;
  font-weight: bold;
`;

const Button = styled.button`

`;


const HomePage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [forecast, setForecast] = useState([]);

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

  const fetchForecast = async () => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=7&key=02525ccb316248bba62eb2e25911b795`;
    try {
      const res = await fetch(url);
      if (res.status === 204) {
        setError('Please enter a city');
        throw new Error('City not found');
      }

      const forecastData = await res.json();
      console.log(forecastData);
      if (!forecastData.data || forecastData.data.length === 0) {
        throw new Error('Failed to fetch forecast data');
      }
      setForecast(forecastData.data);
      setError('');
    } catch (err) {
      setForecast([]);
      setError(err.message);
    }
  };

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
      {error && (
      <ErrorContainer>
        <ErrorMessage>
        <CrossIcon>&times;</CrossIcon> 
          {error}
          </ErrorMessage>
      </ErrorContainer>
    )}
      {weather && (
        <WeatherContainer>
          <h2>{weather.city_name}, {weather.country_code}</h2>
          <WeatherIcon src={`/icons/${weather.weather.icon}.png`} alt="Icon" />
          <p>Temperature: {weather.temp}°C</p>
          <p>Humidity: {weather.rh}%</p>
          <p>Description: {weather.weather.description}</p>
          <Button onClick={fetchForecast}>View Forecast for Next 7 Days</Button>
        </WeatherContainer>
      )}
      {forecast.length > 0 && (
        <ForecastContainer>
          {forecast.map((day) => (
            <div key={day.valid_date}>
              <h3>{day.valid_date}</h3>
              <p>Temperature: {day.min_temp}°C - {day.max_temp}°C</p>
              <p>Humidity: {day.rh}%</p>
              <p>Description: {day.weather.description}</p>
            </div>
          ))}
        </ForecastContainer>
      )}
    </div>
  );
  
};

export default HomePage;

