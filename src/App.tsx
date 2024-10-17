import React, { useState } from 'react';
import './App.css';
import { Weather } from './Weather';

function App() {
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<null | string>(null);
  const [weather, setWeather] = useState<{ temp: number, description: string } | null>(null);

  const fetchWeather = () => {
    const apiKey = 'bbc315ca7320fbcb18e2761ab526002b';
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(response => response.json())
      .then(json => {
        if (json.cod === "404") {
          setError('City not found'); // Устанавливаем ошибку, если город не найден
          setWeather(null); // Сбрасываем погоду
        } else {
          setWeather({
            temp: json.main.temp,
            description: json.weather[0].description
          });
          setError(null); // Сбрасываем ошибку, если запрос успешен
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setError('An error occurred'); // Общая ошибка на случай других проблем
        setWeather(null); // Сбрасываем погоду
      });
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div  style={{ padding: '2vh'}}>
        <input 
        type='text' 
        onChange={(e) => setCity(e.currentTarget.value)} 
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get weather</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
     
      </div>
       {weather && <Weather temp={weather.temp} description={weather.description} />}
 
    </div>
  );
}

export default App;