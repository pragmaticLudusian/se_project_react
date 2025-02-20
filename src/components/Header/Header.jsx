import wtwrLogo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
  const date = new Date();

  const [currentDate, setCurrentDate] = useState(""); // date is only handled at the component level
  const [currentName, setCurrentName] = useState(props.name);

  useEffect(() => {
    const isTabletWidth = () =>
      window.innerWidth >= 670 && window.innerWidth < 870; // alt to @media query

    function handleHeaderFormat() {
      setCurrentDate(
        date.toLocaleString("default", {
          month: isTabletWidth() ? "short" : "long",
          day: "numeric",
        })
      );
      setCurrentName(isTabletWidth() ? "T.T." : props.name);
    }

    window.addEventListener("resize", handleHeaderFormat); // allows updating
    if (!currentDate) handleHeaderFormat(); // just in case, render ONLY during mounting phase

    return () => {
      window.removeEventListener("resize", handleHeaderFormat);
    };
  }, [window.innerWidth]);

  return (
    <header className="header">
      <div className="header__preamble-container">
        <Link to="/se_project_react/">
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
          onClick={props.onAddClothesClick}
        >
          + Add clothes
        </button>
        <div className="header__user">
          <Link to="/se_project_react/profile">
            <p className="header__username">{currentName}</p>
          </Link>
          <Link to="/se_project_react/profile">
            <div className="header__avatar header__avatar_image" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
