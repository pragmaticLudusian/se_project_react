import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/currentTemperatureUnitContext";
import "./WeatherCard.css";

function WeatherCard(props) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className={`weather-card weather-card_type_${props.weather}`}>
      {props.temperature}&deg;{currentTemperatureUnit}
    </section>
  );
}

export default WeatherCard;
