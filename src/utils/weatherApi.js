export default function getWeatherInfo({ latitude, longitude }, apiKey) {
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
      weatherObj.temp = data.main.temp.toFixed(1);
      /* weatherObj.temp = {
        C: data.main.temp.toFixed(1),
        F: (data.main.temp * (9 / 5) + 32).toFixed(1),
      }; React doesn't compile with objects OR arrays when loading from scratch. Also sidenote: can't appear to pass objects as props unless it's an array or via createFragment() */
      weatherObj.tempName = getFuzzyTemperature(weatherObj.temp.C);
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
  return time < sunrise || time > sunset ? "night" : "day"; // string for status to be used in css className
}
