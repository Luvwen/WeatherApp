import React, { useEffect, useState } from 'react';

import { useForm } from '../hooks/useForm';

var dayjs = require('dayjs');
const day = dayjs().format('h:mm A');

export const InformationScreen = () => {
  const [formValues, handleInputChange, reset] = useForm({ country: '' });

  const { country } = formValues;

  const [weather, setWeather] = useState({});
  const [backgroundImage, setBackgroundImage] = useState('');

  const handleSearch = () => {
    const apiKey = process.env.REACT_APP_WEATHERAPP_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${apiKey}`;

    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        const { main } = data.weather[0];
        const climateWord = main.toLowerCase();
        setBackgroundImage(climateWord);
        setWeather(data);
        reset();
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSearch();
  };

  return (
    <div className={`general-wrapper ${backgroundImage}`}>
      <div className='weather__search'>
        <h1 className='weather__title'>Search location</h1>
        <form className='search-form' onSubmit={handleSubmit}>
          <input
            type='text'
            name='country'
            value={country}
            className='weather__input '
            onChange={handleInputChange}
          />
          <button className='btn btn-primary search-button'>Search</button>
        </form>
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
