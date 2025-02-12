import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import reroll from "../../assets/reroll.svg";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import "./Main.css";

function Main(props) {
  const filteredArray = props.clothesArray.filter((item) => {
    return item.weather === props.temperatureName;
  });
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="main">
      <WeatherCard weather={props.weather} temperature={props.temperature} />
      <p className="main__text">
        Today is {props.temperature}&deg;{currentTemperatureUnit} / You may want
        to wear:
      </p>
      <section className="cards">
        <ul className="cards__grid">
          {filteredArray.length
            ? filteredArray.map((item) => {
                return (
                  <ItemCard
                    key={item._id} // paramount for map, not so much inside
                    item={item} // all this would be destructured inside
                    openItemModal={props.openItemModal} // props passed...
                    itemCardData={props.itemCardData} // from App
                  />
                ); // the return statement is optional in the context of ternary ops, where otherwise it's mandatory in map blocks
              })
            : "sorry, but none available"}
        </ul>
        <button
          type="button"
          className="cards__random-btn cards__random-btn_active"
        >
          <img
            src={reroll}
            alt="&circlearrowright;"
            className="cards__random-img"
          />
          Randomize
        </button>
      </section>
    </main>
  );
}

export default Main;
