import { _request } from "./api";

export function fetchWeather({ latitude, longitude }, apiKey) {
  return _request(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
  );
}

export function getWeatherInfo(data) {
  const weatherObj = {};
  weatherObj.weather = _getWeatherName(data.weather[0].id);
  weatherObj.temperature = {
    C: data.main.temp.toFixed(1),
    F: (data.main.temp * (9 / 5) + 32).toFixed(1),
  }; // w/out a state's template obj being set, it would render as undef initially
  weatherObj.temperatureName = _getFuzzyTemperature(weatherObj.temperature.C); // default to C
  weatherObj.city = data.name;
  weatherObj.time = _getTimeOfDay(data.sys.sunrise, data.sys.sunset);
  return weatherObj;
}

function _getWeatherName(id) {
  if (id === 800) return "clear";
  switch (Math.floor(id / 100)) {
    case 2:
      return "storm";
    case 3:
      return "rain";
    case 5:
      return "rain";
    case 6:
      return "snow";
    case 7:
      return "fog";
    default:
      return "cloudy";
  }
}

function _getFuzzyTemperature(temp) {
  if (temp > 35) return "hot";
  else if (temp > 25 && temp <= 35) return "warm";
  else if (temp > 15 && temp <= 25) return "cool";
  else return "cold";
}

function _getTimeOfDay(sunrise, sunset) {
  const time = Date.now() / 1000; // api is sec, data.now is msec
  return time < sunrise || time > sunset ? "night" : "day"; // string for status to be used in css className
}
