import "./Main.css";
import "/src/blocks/gallery.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main(props) {
  return (
    <div className="main">
      <WeatherCard weather={props.weather} temperature={props.temperature} />
      <p className="main__text">
        Today is {props.temperature} / You may want to wear:
      </p>
      <ul className="gallery">
        {props.clothesArray
          .filter((item) => {
            return item.weather === props.temperatureName; // filter is temp disabled
          })
          .map((item, i) => (
            <ItemCard
              key={i}
              name={item.name}
              link={item.link}
              weather={item.weather}
              openItemModal={props.openItemModal} // props passed from App
              itemCardData={props.itemCardData}
            />
          ))}
      </ul>
    </div>
  );
}

export default Main;
