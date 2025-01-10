import "./Header.css";
import wtwrLogo from "../../assets/logo.svg";

function Header(props) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const isImage = true; // test

  return (
    <header className="header">
      <img src={wtwrLogo} alt="WTWR logo" className="header__logo" />
      <p className="header__time-and-place">
        {[currentDate, props.location].join(", ")}
      </p>
      <button
        className="header__add-clothes-btn"
        type="button"
        onClick={props.openFormModal}
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        {
          isImage ? (
            <div className="header__avatar header__avatar_image"></div>
          ) : (
            <div className="header__avatar header__avatar_text">T</div>
          ) /* this is also test */
        }
      </div>
    </header>
  );
}

export default Header;
