import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
// AddItemModal is considered to be extended from ModalWithForm, despite MWF component contained *within* AIM

function AddItemModal({ onAddItem, onClose }) {
  const [name, setName] = useState({
    value: "",
    isValid: false,
    validationMessage: "",
  });
  const [imageUrl, setImageUrl] = useState({
    value: "",
    isValid: false,
    validationMessage: "",
  });
  const [weather, setWeather] = useState({
    value: "",
    isValid: false,
    validationMessage: "",
  }); // because the form submission button is disabled and radio cannot be unset, validation msg is pointless to implement here
  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    setName({ value: "" });
    setImageUrl({ value: "" });
    setWeather({ value: "" });
  }, []);

  function handleName(event) {
    setName({
      value: event.target.value,
      isValid: event.target.validity.valid,
      validationMessage:
        event.target.validationMessage && `(${event.target.validationMessage})`,
    });
    setFormValid(event.target.closest("form").checkValidity());
  }

  function handleLink(event) {
    setImageUrl({
      value: event.target.value,
      isValid: event.target.validity.valid,
      validationMessage:
        event.target.validationMessage && `(${event.target.validationMessage})`,
    });
    setFormValid(event.target.closest("form").checkValidity());
  }

  function handleWeather(event) {
    setWeather({
      value: event.target.value,
    });
    setFormValid(event.target.closest("form").checkValidity());
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddItem({ name, imageUrl, weather }); // FormData can be used here instead
    onClose();
  }

  return (
    <ModalWithForm
      title="New garment"
      name="add-clothes"
      buttonText="Add garment"
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}
    >
      <label
        className={`form-modal__label ${
          name.validationMessage ? "form-modal__label_error" : ""
        }`}
      >
        Name {!name.isValid && name.validationMessage}
        <input
          type="text"
          className={`form-modal__input form-modal__input_type_text ${
            name.validationMessage ? "form-modal__input_error" : ""
          }`}
          name="name"
          id="add-clothes_name" // used with htmlFor, unless nested inside label
          placeholder="Name"
          required
          onChange={handleName}
        />
      </label>
      <label
        className={`form-modal__label ${
          imageUrl.validationMessage ? "form-modal__label_error" : ""
        }`}
      >
        Image {!imageUrl.isValid && imageUrl.validationMessage}
        <input
          type="url"
          className={`form-modal__input form-modal__input_type_text ${
            imageUrl.validationMessage ? "form-modal__input_error" : ""
          }`}
          name="imageUrl"
          id="add-clothes_imageUrl"
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
            className="form-modal__input form-modal__input_type_radio"
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
            className="form-modal__input form-modal__input_type_radio"
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
            className="form-modal__input form-modal__input_type_radio"
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
            className="form-modal__input form-modal__input_type_radio"
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
