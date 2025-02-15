import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
// AddItemModal is considered to be extended from ModalWithForm, despite MWF contained *within* AIM

function AddItemModal({ onAddItem, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
    setWeather("");
  }, []);

  function handleName(event) {
    setName(event.target.value);
  }

  function handleLink(event) {
    setLink(event.target.value);
  }

  function handleWeather(event) {
    setWeather(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddItem({ name, link, weather });
    onClose();
  }

  return (
    <ModalWithForm
      title="New garment"
      name="add-clothes"
      buttonText="Add garment"
      onClose={onClose}
      onSubmit={handleSubmit}
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
          onChange={handleName}
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
          onChange={handleLink}
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
            onChange={handleWeather}
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
            onChange={handleWeather}
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
            onChange={handleWeather}
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
            onChange={handleWeather}
          />
          <label htmlFor="cold" className="form-modal__radio-label">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
