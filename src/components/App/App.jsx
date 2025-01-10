import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import getWeatherInfo from "/src/utils/weatherApi";
import { defaultClothingItems } from "/src/utils/constants";

function App() {
  const [openedModal, setOpenedModal] = useState("");
  const [selectedItemCard, setItemCard] = useState(null);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    getWeatherInfo()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleModalClose() {
    setOpenedModal("");
  }

  return (
    <>
      <Header
        location={weatherData.city}
        openFormModal={() => setOpenedModal("add-clothes")}
      />
      <Main
        weather={`${weatherData.weather}-${weatherData.time}`}
        temperature={weatherData.temperature}
        temperatureName={weatherData.temperatureName}
        openItemModal={() => {
          setOpenedModal("card"); // opens the modal window for the item card by passing to Main and then to ItemCard's onClick event handler
        }}
        clothesArray={defaultClothingItems}
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
          onClose={handleModalClose}
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
          onClose={handleModalClose}
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
                <div className="item-modal__name">{selectedItemCard.name}</div>
              </div>
            </div>
            <div className="item-modal__description">
              Weather: {selectedItemCard.weather}
            </div>
          </>
        </ItemModal>
      )}
    </>
  );
}

export default App;
