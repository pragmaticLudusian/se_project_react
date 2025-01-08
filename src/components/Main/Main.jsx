import "./Main.css";
import "/src/blocks/gallery.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main(props) {
  const filteredArray = props.clothesArray.filter((item) => {
    return item.weather === props.temperatureName;
  });

  return (
    <main className="main">
      <WeatherCard weather={props.weather} temperature={props.temperature} />
      <p className="main__text">
        Today is {props.temperature}&deg;C / You may want to wear:
      </p>
      <section className="cards">
        <ul className="cards__grid">
          {filteredArray.size != 0 // boolean output is explicit
            ? filteredArray.map((item) => (
                <ItemCard
                  key={item._id} // paramount for map, not so much inside
                  item={item} // all this would be destructured inside
                  openItemModal={props.openItemModal} // props passed from App
                  itemCardData={props.itemCardData}
                />
              ))
            : "sorry, but none available"}
        </ul>
      </section>
    </main>
  );
}

export default Main;
