import "./WeatherCard.css";

function WeatherCard(props) {
  const weatherClass = `weather-card weather-card_type_${props.weather}`;
  return <div className={weatherClass}>{props.temperature}</div>;
}

export default WeatherCard;
