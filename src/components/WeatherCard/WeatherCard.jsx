import "./WeatherCard.css";

function WeatherCard(props) {
  return (
    <section className={`weather-card weather-card_type_${props.weather}`}>
      {props.temp}&deg;C
    </section>
  );
}

export default WeatherCard;
