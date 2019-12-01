import React from 'react';
import './assets/index.css';
import ReactDOM from 'react-dom';
import { paramExtractor } from './libs/StringUtils';
import { Landing, Restaurant } from './pages';

ReactDOM.render(paramExtractor() ? <Restaurant /> : <Landing />, document.getElementById('root'));
