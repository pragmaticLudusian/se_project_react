import "./WeatherCard.css";

function WeatherCard(props) {
  return (
    <div className={`weather-card weather-card_type_${props.weather}`}>
      {props.temperature}
    </div>
  );
}

export default WeatherCard;
