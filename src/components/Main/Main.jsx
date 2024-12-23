import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";

function Main(props) {
  return (
    <div className="main">
      <WeatherCard weather={props.weather} temperature={props.temperature} />
    </div>
  );
}

export default Main;
