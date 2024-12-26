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
      ></ModalWithForm>
    </>
  );
}

export default App;
