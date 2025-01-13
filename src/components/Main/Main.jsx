import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import reroll from "../../assets/reroll.svg";

function Main(props) {
  const filteredArray = props.clothesArray.filter((item) => {
    return item.weather === props.tempName;
  });

  return (
    <main className="main">
      <WeatherCard weather={props.weather} temp={props.temp} />
      <p className="main__text">
        Today is {props.temp}&deg;C / You may want to wear:
      </p>
      <section className="cards">
        <ul className="cards__grid">
          {filteredArray.length
            ? filteredArray.map((item) => (
                <ItemCard
                  key={item._id} // paramount for map, not so much inside
                  item={item} // all this would be destructured inside
                  openItemModal={props.openItemModal} // props passed...
                  itemCardData={props.itemCardData} // from App
                />
              ))
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
