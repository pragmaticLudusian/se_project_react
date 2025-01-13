import "./Header.css";
import wtwrLogo from "../../assets/logo.svg";
import { useEffect, useState } from "react";

function Header(props) {
  const date = new Date();

  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false); // since it's exclusive to this component, it's better than to pass a couple of props (function and state);
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
  });

  return (
    <header className="header">
      <div className="header__preamble-container">
        <img src={wtwrLogo} alt="WTWR logo" className="header__logo" />
        <p className="header__time-and-place">
          {[currentDate, props.location].join(", ")}
        </p>
      </div>
      {!isMobileMenuOpened && (
        <button
          type="button"
          className="header__menu-btn"
          onClick={() => {
            setMobileMenuOpened(true);
          }}
        />
      )}
      <div
        className={`header__user-container header__user-container_${
          isMobileMenuOpened ? "mobile" : "desktop"
        }`}
      >
        {isMobileMenuOpened && (
          <button
            type="button"
            className="header__menu-close-btn"
            onClick={() => {
              setMobileMenuOpened(false);
            }}
          />
        )}
        <button
          className="header__add-clothes-btn"
          type="button"
          onClick={props.openFormModal}
        >
          + Add clothes
        </button>
        <div className="header__user">
          <p className="header__username">Terrence Tegegne</p>
          <div className="header__avatar header__avatar_image" />
        </div>
      </div>
    </header>
  );
}

export default Header;
