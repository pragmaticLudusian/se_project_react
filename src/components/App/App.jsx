import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import { location, apiKey } from "../../utils/constants";
import { fetchWeather, getWeatherInfo } from "../../utils/weatherApi";
import { getItems } from "../../utils/api";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import "./App.css";

function App() {
  const [openedModal, setOpenedModal] = useState("");
  const [selectedItemCard, setItemCard] = useState(null);
  const [weatherData, setWeatherData] = useState({}); // instead of an empty obj, it could have the structure all set up by default. alt. use var? or obj && obj.key
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false); // if this were to be exclusive to this component, App wouldn't know how to close other modal components. This "lifting" of the state is normal practice.
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    fetchWeather(location, apiKey)
      .then((data) => {
        return getWeatherInfo(data);
      })
      .then((filteredData) => {
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data);
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

  function handleAddItemSubmit(newItem) {
    newItem._id = clothingItems.length; // _id starts from 0
    setClothingItems([newItem, ...clothingItems]);
  } // AddItemModal -> ModalWithForm -> handleSubmit -> onAddItem(obj)

  function handleCardDelete() {
    const filteredArray = clothingItems.filter(
      (item) => item !== selectedItemCard
    );
    setClothingItems(filteredArray);
    handleModal();
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
        <Routes>
          <Route
            path="/se_project_react/"
            element={
              <Main
                weather={`${weatherData.weather}-${weatherData.time}`}
                temperature={
                  weatherData.temperature &&
                  weatherData.temperature[currentTemperatureUnit]
                } // ensures soft initializing of object before passing a specific temp unit.
                // note: passing an obj isn't possible as a child otherwise. setting another state/ref as just the temperature to handle results in a delay and cause a mismatch. although the temp unit is a context, the value is still a prop. so solution was to use the var check before passing the prop onwards
                temperatureName={weatherData.temperatureName}
                openItemModal={() => {
                  handleModal("card"); // opens the modal window for the item card by passing to Main and then to ItemCard's onClick event handler
                }}
                clothesArray={clothingItems}
                itemCardData={(card) => {
                  setItemCard(card); // in order to set the selected ItemCard, it needs to pass to Main, then to the specific ItemCard, then return the card prop set (object) back to App, and then pass it ItemModal's children elements by reading its state
                }}
              />
            }
          />
          <Route
            path="/se_project_react/profile"
            element={
              <Profile
                clothesArray={clothingItems}
                openFormModal={() => handleModal("add-clothes")}
                openItemModal={() => handleModal("card")}
                itemCardData={(card) => setItemCard(card)}
              />
            }
          />
        </Routes>
        <Footer />
        {openedModal === "add-clothes" && (
          <AddItemModal onClose={handleModal} onAddItem={handleAddItemSubmit} />
        )}
        {openedModal === "card" && (
          <ItemModal
            onClose={handleModal}
            itemCardData={selectedItemCard} // App => Main => ItemCard
            openDeleteConfirm={() => handleModal("delete-confirm")}
          />
        )}
        {openedModal === "delete-confirm" && (
          <DeleteConfirmModal
            onClose={handleModal}
            itemCardData={selectedItemCard}
            onDeleteItem={handleCardDelete}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </>
  );
}

export default App;
