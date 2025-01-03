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
      const weather = data.weather[0].main;
      const temp = data.main.temp.toFixed(1);
      const city = data.name;
      return { weather, temp, city, feel: fuzzyTemperature(temp) };
    })
    .catch((err) => {
      console.error(err);
    });
}

function fuzzyTemperature(temp) {
  if (temp >= 35) return "hot";
  else if (temp >= 25 && temp < 35) return "warm";
  else if (temp >= 15 && temp < 25) return "cool";
  else return "cold";
}
