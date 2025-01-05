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
      const weather = data.weather[0].id;
      const temperature = data.main.temp.toFixed(1);
      const city = data.name;
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      return {
        weather: getWeatherName(weather),
        temperature,
        temperatureName: getFuzzyTemperature(temperature),
        city,
        time: getTimeOfDay(sunrise, sunset),
      };
    })
    .catch((err) => {
      console.error(err);
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
  switch (true) {
    case temp > 35:
      return "hot";
    case temp > 25 && temp <= 35:
      return "warm";
    case temp > 15 && temp <= 25:
      return "cool";
    default:
      return "cold";
  }
}

function getTimeOfDay(sunrise, sunset) {
  const time = Date.now() / 1000; // api is sec, data.now is msec
  return time < sunrise || time > sunset ? "night" : "day";
}
