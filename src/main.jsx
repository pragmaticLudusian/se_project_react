import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./index.css";

ReactDOM.createRoot(document.querySelector(".page__content")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
