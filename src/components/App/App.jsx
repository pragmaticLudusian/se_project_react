import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";

function App() {
  return (
    <>
      <Header location="South Park" />
      <Main weather="clear-day" temperature="14.4&deg;C" />
    </>
  );
}

export default App;
