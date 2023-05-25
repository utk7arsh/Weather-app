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

const TitleWrapper = styled.div`
  background-color: #1e6cff;
  padding: 30px;
  width: 100%;
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
  padding: 75px;
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

const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  grid-auto-rows: min-content;
  gap: 10px;
  justify-items: center;
  align-items: start;
  margin-top: 20px;
`;

const ForecastContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 30px;
padding: 55px;
padding-top: 50px;
border-radius: 15px;
color: white;
width: 250px;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
font-family: 'Open Sans', sans-serif;
&:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.7);
}
background-color: #3DD0FF;
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
  background-color: turquoise;
  border: none; 
  border-radius: 10px; 
  color: black; 
  padding: 15px 25px
`;


const HomePage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [forecast, setForecast] = useState([]);
  const [showForecast, setShowForecast] = useState(false); // Track whether forecast has been fetched

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
      setShowForecast(false);
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
      setShowForecast(true); 
    } catch (err) {
      setForecast([]);
      setError(err.message);
    }
  };

  const handleForecastButtonClick = () => {
    fetchForecast();
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
          {!showForecast && ( // Render the button
            <Button onClick={handleForecastButtonClick}>
              View Forecast for Next 7 Days
            </Button>
          )}
        </WeatherContainer>
      )}
      {showForecast && forecast.length > 0 && ( // Render the forecast 
        <ForecastGrid>
          {forecast.map((day) => (
            <ForecastContainer key={day.valid_date}>
              <h3>{day.valid_date}</h3>
              <WeatherIcon src={`/icons/${day.weather.icon}.png`} alt="Icon" />
              <p>Temperature: </p>
              <p>High: {day.max_temp}°C, Low: {day.min_temp}°C</p>
              <p>Humidity: {day.rh}%</p>
              <p>Description: {day.weather.description}</p>
            </ForecastContainer>
          ))}
        </ForecastGrid>
      )}
    </div>
  );
};

export default HomePage;

