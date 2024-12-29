import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  return (
    <>
      <Header location="South Park" />
      <Main weather="snow-night" temperature="14.4&deg;C" />
      <Footer />
      <ModalWithForm
        title="New garment"
        name="add-clothes"
        buttonText="Add garment"
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
    </>
  );
}

export default App;
