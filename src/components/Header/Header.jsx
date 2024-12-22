import "./Header.css";
import "/src/blocks/user.css";
import wtwrLogo from "/src/assets/logo.svg";
import userAvatar from "/src/assets/avatar_image.png";

function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentPlace = "South Park";

  return (
    <header className="header">
      <img src={wtwrLogo} alt="WTWR logo" className="header__logo" />
      <p className="header__time-and-place">
        {[currentDate, currentPlace].join(", ")}
      </p>
      <button className="header__add-clothes" type="button">
        + Add clothes
      </button>
      <div className="user">
        <p className="user__name">Terrence Tegegne</p>
        <img src={userAvatar} alt="User avatar" className="user__avatar" />
      </div>
    </header>
  );
}

export default Header;
