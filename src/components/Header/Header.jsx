import "./Header.css";
import "/src/blocks/user.css";
import wtwrLogo from "/src/assets/logo.svg";

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
        className="header__add-clothes"
        type="button"
        onClick={props.openModal}
      >
        + Add clothes
      </button>
      <div className="user">
        <p className="user__name">Terrence Tegegne</p>
        <div className="user__avatar user__avatar_image">{!isImage && "T"}</div>
      </div>
    </header>
  );
}

export default Header;
