import { useEffect, useRef, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems, location, apiKey } from "../../utils/constants";
import { fetchWeather, getWeatherInfo } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/currentTemperatureUnitContext";
import "./App.css";

function App() {
  const [openedModal, setOpenedModal] = useState("");
  const [selectedItemCard, setItemCard] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false); // if this were to be exclusive to this component, App wouldn't know how to close other modal components. This "lifting" of the state is normal practice.
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("C");

  useEffect(() => {
    fetchWeather(location, apiKey)
      .then((data) => {
        return getWeatherInfo(data);
      })
      .then((filteredData) => {
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  function handleModal(window = "") {
    // if just called, simply close any active modal window - perfect for using a callback
    setOpenedModal(window);
    window && setMobileMenuOpened(false);
  }

  function handleToggleSwitchChange() {
    currentTemperatureUnit === "C"
      ? setCurrentTemperatureUnit("F")
      : setCurrentTemperatureUnit("C");
  }

  return (
    <>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          location={weatherData.city}
          openFormModal={() => handleModal("add-clothes")}
          isMobileMenuOpened={isMobileMenuOpened}
          setMobileMenuOpened={(state) => setMobileMenuOpened(state)}
          // toggleTempUnit={handleToggleSwitchChange} not needed when using context
        />
        <Main
          weather={`${weatherData.weather}-${weatherData.time}`}
          temp={weatherData.temp && weatherData.temp[currentTemperatureUnit]} // passing an obj isn't possible as a child and neither is a property of said obj due to undef on page load. setting another state/ref as just the temperature to handle results in a delay. solution was to use the var check before passing the prop onwards
          tempName={weatherData.tempName}
          openItemModal={() => {
            handleModal("card"); // opens the modal window for the item card by passing to Main and then to ItemCard's onClick event handler
          }}
          clothesArray={clothingItems}
          itemCardData={(card) => {
            setItemCard(card); // in order to set the selected ItemCard, it needs to pass to Main and then to the specific ItemCard, then return the card prop set (object) back to App, then pass it ItemModal's children elements by reading its state
          }}
        />
        <Footer />
        {openedModal === "add-clothes" && (
          <ModalWithForm
            title="New garment"
            name="add-clothes"
            buttonText="Add garment"
            onClose={handleModal}
          >
            <label className="form-modal__label">
              Name
              <input
                type="text"
                className="form-modal__input"
                name="name"
                id="add-clothes_name" // used with htmlFor, unless nested inside label
                placeholder="Name"
                required
              />
            </label>
            <label className="form-modal__label">
              Image
              <input
                type="url"
                className="form-modal__input"
                name="image"
                id="add-clothes_image"
                placeholder="Image URL"
                required
              />
            </label>
            <fieldset className="form-modal__fieldset">
              <legend className="form-modal__radio-legend">
                Select the weather type:
              </legend>
              <div className="form-modal__radio-container">
                <input
                  type="radio"
                  name="weather"
                  id="hot"
                  value="hot"
                  className="form-modal__radio-btn"
                  required // for at least one radio
                />
                <label htmlFor="hot" className="form-modal__radio-label">
                  Hot
                </label>
              </div>
              <div className="form-modal__radio-container">
                <input
                  type="radio"
                  name="weather"
                  id="warm"
                  value="warm"
                  className="form-modal__radio-btn"
                />
                <label htmlFor="warm" className="form-modal__radio-label">
                  Warm
                </label>
              </div>
              <div className="form-modal__radio-container">
                <input
                  type="radio"
                  name="weather"
                  id="cool"
                  value="cool"
                  className="form-modal__radio-btn"
                />
                <label htmlFor="cool" className="form-modal__radio-label">
                  Cool
                </label>
              </div>
              <div className="form-modal__radio-container">
                <input
                  type="radio"
                  name="weather"
                  id="cold"
                  value="cold"
                  className="form-modal__radio-btn"
                />
                <label htmlFor="cold" className="form-modal__radio-label">
                  Cold
                </label>
              </div>
            </fieldset>
          </ModalWithForm>
        )}
        {openedModal === "card" && (
          <ItemModal
            onClose={handleModal}
            // itemCardData={selectedItemCard} this prop would be needed if props.children isn't used, which is handled by App => Main => ItemCard anyways
          >
            <>
              <div className="item-modal__card-container">
                <img
                  src={selectedItemCard.link}
                  alt={selectedItemCard.name}
                  className="item-modal__image"
                />
                <div className="item-modal__header">
                  <p className="item-modal__name">{selectedItemCard.name}</p>
                </div>
              </div>
              <div className="item-modal__text-container">
                <p className="item-modal__description">
                  Weather: {selectedItemCard.weather}
                </p>
              </div>
            </>
          </ItemModal>
        )}
      </CurrentTemperatureUnitContext.Provider>
    </>
  );
}

export default App;
