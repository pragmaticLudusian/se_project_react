import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/customHooks";
// AddItemModal is considered to be extended from ModalWithForm, despite MWF component contained *within* AIM

function AddItemModal({ isOpen, onAddItem, onClose, buttonText }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    resetForm();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    onAddItem(values); // close modal from there inside .then
  }

  return (
    <ModalWithForm
      title="New garment"
      name="add-clothes"
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isOpen={isOpen}
    >
      <label
        className={`form-modal__label ${
          errors.name ? "form-modal__label_error" : ""
        }`}
      >
        Name {errors.name && `(${errors.name})`}
        <input
          type="text"
          className={`form-modal__input form-modal__input_type_text ${
            errors.name ? "form-modal__input_error" : ""
          }`}
          name="name"
          id="add-clothes_name" // used with htmlFor, unless nested inside label
          placeholder="Name"
          required
          onChange={handleChange}
          value={values.name || ""} // initially it would not only be outdated but also be undef, which can cause conflict between (un)controlling the input. the || resolves this
        />
      </label>
      <label
        className={`form-modal__label ${
          errors.imageUrl ? "form-modal__label_error" : ""
        }`}
      >
        Image {errors.imageUrl && `(${errors.imageUrl})`}
        <input
          type="url"
          className={`form-modal__input form-modal__input_type_text ${
            errors.imageUrl ? "form-modal__input_error" : ""
          }`}
          name="imageUrl"
          id="add-clothes_imageUrl"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.imageUrl || ""}
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
            checked={values.weather === "hot"}
            className="form-modal__input form-modal__input_type_radio"
            required // for at least one radio
            onChange={handleChange}
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
            checked={values.weather === "warm"}
            className="form-modal__input form-modal__input_type_radio"
            onChange={handleChange}
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
            checked={values.weather === "cool"}
            className="form-modal__input form-modal__input_type_radio"
            onChange={handleChange}
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
            checked={values.weather === "cold"}
            className="form-modal__input form-modal__input_type_radio"
            onChange={handleChange}
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
