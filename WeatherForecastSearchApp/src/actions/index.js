import axios from 'axios';
const API_KEY='2e4ea367cb6dc6cc56e05fd242c1cda3';
const ROOT_URL =`http://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function featchWeather(city){
  const url = `${ROOT_URL}&q=${city}`;
  const request = axios.get(url);
  console.log("API Response :",request)
  // here we are returning the request, the redux reducer is responsible for picking the result of it and send it to the reducers.
  return {
    type:FETCH_WEATHER,
    payload:request
  }
}
