import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  return (
    <>
      <Header location="South Park" />
      <Main weather="snow-night" temperature="14.4&deg;C" />
      <Footer />
    </>
  );
}

export default App;
