import React from 'react';
import ReactDOM from 'react-dom';
import { WeatherApp } from './WeatherApp';

import './styles/styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>,
  document.getElementById('root')
);
