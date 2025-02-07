import "./ToggleSwitch.css";

function ToggleSwitch() {
  return (
    <label className="toggle-switch">
      <input type="checkbox" className="toggle-switch__checkbox" />
      <div className="toggle-switch__button" />
      <span className="toggle-switch__option toggle-switch__option_active">
        C
      </span>
      <span className="toggle-switch__option">F</span>
    </label>
  );
}

export default ToggleSwitch;
