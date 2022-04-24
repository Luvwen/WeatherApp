import React, { useState } from 'react';

import { useForm } from '../hooks/useForm';

var dayjs = require('dayjs');
const day = dayjs().format('h:mm A');

export const InformationScreen = () => {
  const [formValues, handleInputChange, reset] = useForm({ country: '' });

  const { country } = formValues;

  const [weather, setWeather] = useState({});

  // Fetch data from Weather api

  const handleSearch = () => {
    const apiKey = process.env.REACT_APP_WEATHERAPP_KEY;

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${apiKey}`;

    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        setWeather(data);
        reset();
      });
  };

  // Change background color
  const body = document.getElementById('body');

  if (weather?.weather) {
    if (weather.weather[0].main === 'Clouds') {
      body.classList.add('clear');
      body.classList.remove('rainy');
      body.classList.remove('mist');
      body.classList.remove('snow');
    } else if (weather.weather[0].main === 'Rain') {
      body.classList.add('rainy');
      body.classList.remove('clear');
      body.classList.remove('mist');
      body.classList.remove('snow');
    } else if (
      weather.weather[0].main === 'Mist' ||
      weather.weather[0].main === 'Fog'
    ) {
      body.classList.add('mist');
      body.classList.remove('clear');
      body.classList.remove('rainy');
      body.classList.remove('snow');
    } else if (weather.weather[0].main === 'Snow') {
      body.classList.add('snow');
      body.classList.remove('clear');
      body.classList.remove('rainy');
      body.classList.remove('mist');
    }
  }

  return (
    <div className='general-wrapper'>
      <div className='weather__search'>
        <h1 className='weather__title'>Search location</h1>
        <input
          type='text'
          name='country'
          value={country}
          className='weather__input '
          onChange={handleInputChange}
        />
        <button className='btn btn-primary' onClick={handleSearch}>
          Search
        </button>
      </div>
      {weather.weather ? (
        <div className='weather-container'>
          <div className='weather-city'>
            <p className='weather-container__city'>{weather.name}</p>
            <p className='weather-container__date'>{day}</p>
          </div>
          <h2 className='weather-container__title'>
            {`${weather.main.temp}°C`}
          </h2>
          <p className='weather-container__text'>
            {weather.weather[0].main}
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt='Sun'
              className='weather-container__img'
            ></img>
          </p>
          <div className='weather-container-stats'>
            <div className='weather-info-container'>
              <p>Hum: </p>
              <p>{weather.main.humidity}%</p>
            </div>
            <div className='weather-info-container'>
              <p>Min:</p>
              <p>{weather.main.temp_min}</p>
            </div>
            <div className='weather-info-container'>
              <p>Max:</p>
              <p>{weather.main.temp_max}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {weather?.message ? (
            <div className='warning-container'>
              City not found please try again
            </div>
          ) : (
            <div className='warning-container'></div>
          )}
        </>
      )}
    </div>
  );
};
