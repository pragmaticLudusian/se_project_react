import "./SideBar.css";

function SideBar() {
  return (
    <aside className="side-bar">
      <div className="side-bar__avatar side-bar__avatar_image" />
      <div className="side-bar__user-container">
        <p className="side-bar__username">Terrence Tegegne</p>
        <div className="side-bar__user-options">
          <button type="button" className="side-bar__user-option">
            Change profile data
          </button>
          <button type="button" className="side-bar__user-option">
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
