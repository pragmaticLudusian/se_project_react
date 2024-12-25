import "./Main.css";
import "/src/blocks/gallery.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main(props) {
  const clothesArray = [
    {
      name: "T-Shirt",
      image: "/src/assets/clothes/sample_t-shirt.png",
      type: "warm",
    },
    {
      name: "Shorts",
      image: "/src/assets/clothes/sample_shorts.png",
      type: "hot",
    },
    {
      name: "Cap",
      image: "/src/assets/clothes/sample_cap.png",
      type: "cold",
    },
    {
      name: "Sneakers",
      image: "/src/assets/clothes/sample_sneakers.png",
      type: "warm",
    },
  ];
  return (
    <div className="main">
      <WeatherCard weather={props.weather} temperature={props.temperature} />
      <p className="main__text">
        Today is {props.temperature} / You may want to wear:
      </p>
      <ul className="gallery">
        {clothesArray.map((item, i) => (
          <ItemCard
            key={i}
            name={item.name}
            image={item.image}
            type={item.type}
          />
        ))}
      </ul>
    </div>
  );
}

export default Main;
