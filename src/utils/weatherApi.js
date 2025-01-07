import { apiKey, latitude, longitude } from "./constants";

export default function getWeatherInfo() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
  )
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`error ${res.status}`);
    })
    .then((data) => {
      const weatherObj = {};
      weatherObj.weather = getWeatherName(data.weather[0].id);
      weatherObj.temperature = data.main.temp.toFixed(1);
      weatherObj.temperatureName = getFuzzyTemperature(weatherObj.temperature);
      weatherObj.city = data.name;
      weatherObj.time = getTimeOfDay(data.sys.sunrise, data.sys.sunset);
      return weatherObj;
    });
}

function getWeatherName(id) {
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

function getFuzzyTemperature(temp) {
  if (temp > 35) return "hot";
  else if (temp > 25 && temp <= 35) return "warm";
  else if (temp > 15 && temp <= 25) return "cool";
  else return "cold";
}

function getTimeOfDay(sunrise, sunset) {
  const time = Date.now() / 1000; // api is sec, data.now is msec
  return time < sunrise || time > sunset ? "night" : "day";
}
