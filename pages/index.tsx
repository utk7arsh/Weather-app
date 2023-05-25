import { useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  margin: 10px;
  padding-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f0f0f0;
`;


const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  color: #333;
`;

const FormButton = styled.button`
  background-color: turquoise;
  border: none; 
  border-radius: 25px; 
  color: black;
  padding: 12px 15px;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(64, 224, 208, 0.5);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 20px rgba(64, 224, 208, 0.9);
  } 
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

const ToggleButton = styled.button`
  background-color: turquoise;
  border: none;
  border-radius: 10px;
  color: black;
  padding: 10px 15px;
  margin-right: auto;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(64, 224, 208, 0.5);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 20px rgba(64, 224, 208, 0.9);
  }
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  font-family: 'Open Sans', sans-serif;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.7);
  }
  background-color: #3dd0ff;
  height: 300px; /* Adjust the height as needed */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
};
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
  margin-left: 2px;
  margin-right: 5px;
  font-size: 26px;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: turquoise;
  border: none; 
  border-radius: 10px; 
  color: black;
  padding: 15px 25px;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(64, 224, 208, 0.5);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 20px rgba(64, 224, 208, 0.9);
  } 
`;


const HomePage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [forecast, setForecast] = useState([]);
  const [showForecast, setShowForecast] = useState(false); 
  const [unit, setUnit] = useState('C');

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
      setForecast([]);
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
      setWeather(null);
      setForecast([]);
      setError(err.message);
    }
  };

  const handleForecastButtonClick = () => {
    fetchForecast();
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const convertToFahrenheit = (celsius) => {
    return ((celsius * 9) / 5 + 32).toFixed(2);
  };


  return (
    <div>
      <TitleWrapper>
        <Title>Weather App</Title>
      </TitleWrapper>
      <ToggleButton onClick={toggleUnit}> Unit (°{unit})</ToggleButton>
      <InputWrapper>
        <Form onSubmit={fetchWeather}>
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
          />
          <FormButton type="submit">Get Current Weather</FormButton>
        </Form>

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
          <p>Temperature: {unit === 'C' ? weather.temp : convertToFahrenheit(weather.temp)}°{unit}</p>
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
              <p>High: {unit === 'C' ? day.max_temp : convertToFahrenheit(day.max_temp)}°{unit}, Low: {unit === 'C' ? day.min_temp : convertToFahrenheit(day.min_temp)}°{unit}</p>
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

