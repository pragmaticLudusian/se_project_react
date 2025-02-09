import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/currentTemperatureUnitContext";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  ); // str, func from App

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        onChange={handleToggleSwitchChange}
      />
      <div className="toggle-switch__button" />
      <span
        className={`toggle-switch__option${
          currentTemperatureUnit === "C" ? " toggle-switch__option_active" : ""
        }`}
      >
        C
      </span>
      <span
        className={`toggle-switch__option${
          currentTemperatureUnit === "F" ? " toggle-switch__option_active" : ""
        }`}
      >
        F
      </span>
    </label>
  );
}

export default ToggleSwitch;
