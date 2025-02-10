import wtwrLogo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
  const date = new Date();

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    function handleDateFormat() {
      setCurrentDate(
        date.toLocaleString("default", {
          month:
            window.innerWidth >= 750 && window.innerWidth < 800
              ? "short"
              : "long",
          day: "numeric",
        })
      );
    }

    window.addEventListener("resize", handleDateFormat); // alt to @media query
    if (!currentDate) handleDateFormat(); // just in case, render ONLY during mounting phase

    return () => {
      window.removeEventListener("resize", handleDateFormat);
    };
  }, [window.innerWidth]);

  return (
    <header className="header">
      <div className="header__preamble-container">
        <Link to="/">
          <img src={wtwrLogo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__time-and-place">
          {[currentDate, props.location].join(", ")}
        </p>
      </div>
      {!props.isMobileMenuOpened && (
        <button
          type="button"
          className="header__menu-btn"
          onClick={() => {
            props.setMobileMenuOpened(true);
          }}
        />
      )}
      <div
        className={`header__user-container header__user-container_${
          props.isMobileMenuOpened ? "mobile" : "desktop"
        }`}
      >
        {props.isMobileMenuOpened && (
          <button
            type="button"
            className="header__menu-close-btn"
            onClick={() => {
              props.setMobileMenuOpened(false);
            }}
          />
        )}
        <ToggleSwitch />
        <button
          className="header__add-clothes-btn"
          type="button"
          onClick={props.openFormModal}
        >
          + Add clothes
        </button>
        <div className="header__user">
          <Link to="/profile">
            <p className="header__username">Terrence Tegegne</p>
          </Link>
          <Link to="/profile">
            <div className="header__avatar header__avatar_image" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
