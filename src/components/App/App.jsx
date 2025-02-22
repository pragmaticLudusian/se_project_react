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
import { addItem, deleteItem, getItems } from "../../utils/api"; // git update-index --skip-worktree db.json
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import "./App.css";

function App() {
  const [openedModal, setOpenedModal] = useState(""); // string var doubling as boolean (empty means false)
  const [selectedItemCard, setItemCard] = useState(null);
  const [weatherData, setWeatherData] = useState({}); // instead of an empty obj, it could have the structure all set up by default. alt. use var? or obj && obj.key
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // if this were to be exclusive to this component, App wouldn't know how to close other modal components. This "lifting" of the state is normal practice.
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);

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
    window && setIsMobileMenuOpen(false);
  }

  function handleToggleSwitchChange() {
    currentTemperatureUnit === "C"
      ? setCurrentTemperatureUnit("F")
      : setCurrentTemperatureUnit("C");
  }

  function handleAddItemSubmit({ name, imageUrl, weather }) {
    setIsLoading(true);
    // newItem._id = clothingItems.length; // json-server handles the _id auto-generation
    addItem(name, imageUrl, weather)
      .then((newItem) => {
        setClothingItems((oldItems) => [newItem, ...oldItems]); // prevent state staleness
        handleModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  } // AddItemModal -> ModalWithForm -> handleSubmit -> onAddItem(obj)

  function handleCardDelete() {
    setIsLoading(true);
    deleteItem(selectedItemCard._id)
      .then(() => {
        const filteredArray = clothingItems.filter(
          (item) => item !== selectedItemCard
        );
        setClothingItems(filteredArray);
        handleModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  } // ItemModal -> DeleteConfirmModal (card data is stored in sIC state)

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <Header
        name="Terrence Tegegne" // currently hardcoded
        location={weatherData.city}
        onAddClothesClick={() => handleModal("add-clothes")}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={(state) => setIsMobileMenuOpen(state)}
        // toggleTempUnit={handleToggleSwitchChange} not needed when using context, even though "convention" states that setters are to stay in their originating components
      />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              onCloseMobileMenuClick={() => setIsMobileMenuOpen(false)}
              weather={`${weatherData.weather}-${weatherData.time}`}
              temperature={
                weatherData.temperature &&
                weatherData.temperature[currentTemperatureUnit]
              } // ensures soft initializing of object before passing a specific temp unit.
              // note: passing an obj isn't possible as a child otherwise. setting another state/ref as just the temperature to handle results in a delay and cause a mismatch. although the temp unit is a context, the value is still a prop. so solution was to use the var check before passing the prop onwards
              temperatureName={weatherData.temperatureName}
              clothesArray={clothingItems}
              onCardClick={() => {
                handleModal("card"); // opens the modal window for the item card by passing to Main and then to ItemCard's onClick event handler
              }}
              itemCardData={(card) => {
                setItemCard(card); // in order to set the selected ItemCard, it needs to pass to Main, then to the specific ItemCard, then return the card prop set (object) back to App, and then pass it ItemModal's children elements by reading its state
              }}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              onCloseMobileMenuClick={() => setIsMobileMenuOpen(false)}
              clothesArray={clothingItems}
              onAddClothesClick={() => handleModal("add-clothes")}
              onCardClick={() => handleModal("card")}
              itemCardData={(card) => setItemCard(card)}
            />
          }
        />
      </Routes>
      <Footer />
      {openedModal === "add-clothes" && (
        <AddItemModal
          isOpen={openedModal}
          onClose={handleModal}
          onAddItem={handleAddItemSubmit}
          buttonText={isLoading ? "Adding..." : "Add garment"}
        />
      )}
      {openedModal === "card" && (
        <ItemModal
          isOpen={openedModal}
          onClose={handleModal}
          itemCardData={selectedItemCard} // App => Main => ItemCard
          openDeleteConfirm={() => handleModal("delete-confirm")}
        />
      )}
      {openedModal === "delete-confirm" && (
        <DeleteConfirmModal
          isOpen={openedModal}
          onClose={handleModal}
          itemCardData={selectedItemCard}
          onDeleteItem={handleCardDelete}
          buttonText={isLoading ? "Deleting..." : "Yes, delete item"}
        />
      )}
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
