import "./Main.css";
import "/src/blocks/gallery.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { clothesArray } from "/src/utils/constants";

function Main(props) {
  return (
    <div className="main">
      <WeatherCard weather={props.weather} temperature={props.temperature} />
      <p className="main__text">
        Today is {props.temperature} / You may want to wear:
      </p>
      <ul className="gallery">
        {clothesArray
          .filter((item) => {
            return item.type !== ""; // filter is temp disabled
          })
          .map((item, i) => (
            <ItemCard
              key={i}
              name={item.name}
              image={item.image}
              type={item.type}
              openItemModal={props.openItemModal} // props passed from App
              itemCardData={props.itemCardData}
            />
          ))}
      </ul>
    </div>
  );
}

export default Main;
