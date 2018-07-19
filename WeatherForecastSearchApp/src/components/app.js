import React, { Component } from 'react';
import SearchBar from '../container/searchbar.js'
import WeatherList from '../container/weather-list.js'
export default class App extends Component {
  render() {
    return (
      <div>React simple starter
        <SearchBar />
        <WeatherList />
      </div>
    );
  }
}
