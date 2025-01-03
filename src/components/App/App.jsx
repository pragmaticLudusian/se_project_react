import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [formModalOpened, setFormModalOpened] = useState(false);
  const [itemModalOpened, setItemModalOpened] = useState(false);
  const [selectedItemCard, setItemCard] = useState(null); // just id goes here?

  return (
    <>
      <Header
        location="South Park"
        openFormModal={() => setFormModalOpened(true)}
      />
      <Main
        weather="clear-day"
        temperature="14.4&deg;C"
        openItemModal={() => {
          setItemModalOpened(true); // opens the modal window for the item card by passing to Main and then to ItemCard's onClick event handler
        }}
        itemCardData={(card) => {
          setItemCard(card); // in order to set the selected ItemCard, it needs to pass to Main and then to the specific ItemCard, then return the card prop set (object) back to App, then pass it ItemModal's children elements by reading its state
        }}
      />
      <Footer />
      {formModalOpened && (
        <ModalWithForm
          title="New garment"
          name="add-clothes"
          buttonText="Add garment"
          onClose={() => {
            setFormModalOpened(false);
          }}
        >
          <fieldset className="form">
            <label htmlFor="add-clothes_name" className="form__label">
              Name
            </label>
            <input
              type="text"
              className="form__input"
              name="name"
              id="add-clothes_name" // used with htmlFor
              placeholder="Name"
              required
            />
            <label htmlFor="add-clothes_image" className="form__label">
              Image
            </label>
            <input
              type="url"
              className="form__input"
              name="image"
              id="add-clothes_image" // used with htmlFor
              placeholder="Image URL"
              required
            />
            <p className="form__radio-text">Select the weather type:</p>
            <div className="form__radio-container">
              <input
                type="radio"
                name="weather"
                id="hot"
                value="hot"
                className="form__radio-button"
                required // for at least one radio
              />
              <label htmlFor="hot" className="form__radio-label">
                Hot
              </label>
            </div>
            <div className="form__radio-container">
              <input
                type="radio"
                name="weather"
                id="warm"
                value="warm"
                className="form__radio-button"
              />
              <label htmlFor="warm" className="form__radio-label">
                Warm
              </label>
            </div>
            <div className="form__radio-container">
              <input
                type="radio"
                name="weather"
                id="cold"
                value="cold"
                className="form__radio-button"
              />
              <label htmlFor="cold" className="form__radio-label">
                Cold
              </label>
            </div>
          </fieldset>
        </ModalWithForm>
      )}
      {itemModalOpened && (
        <ItemModal
          onClose={() => {
            setItemModalOpened(false);
          }} // must be an anon function, since a regular callback causes mass rerender issues and refuse to load with content even if forced
          // itemCardData={selectedItemCard} // prop would be needed if props.children isn't used
        >
          <div
            className="item-modal__image"
            style={{
              background: `url(${new URL(
                selectedItemCard.image,
                import.meta.url
              )}) no-repeat center/cover`,
            }}
          >
            <div className="item-modal__name">{selectedItemCard.name}</div>
          </div>
          <div className="item-modal__description">
            Weather: {selectedItemCard.type}
          </div>
        </ItemModal>
      )}
    </>
  );
}

export default App;
