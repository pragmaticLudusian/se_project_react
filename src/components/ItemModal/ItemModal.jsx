import { useEffect } from "react";
import "./ItemModal.css";

function ItemModal(props) {
  useEffect(() => {
    window.addEventListener("keydown", handleModalClose);
    document
      .querySelector(".item-modal")
      .addEventListener("click", handleModalClose);

    function handleModalClose(event) {
      if (
        event.key === "Escape" ||
        event.target.classList.contains("item-modal")
      ) {
        props.onClose();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleModalClose);
    };
  });

  return (
    <div className="item-modal">
      <div className="item-modal__window">
        <button
          type="button"
          className="item-modal__close-btn"
          onClick={props.onClose}
        />
        {
          // seems more convenient to format children - even in differing modals - passed as children from the App level
          props.children
        }
      </div>
    </div>
  );
}

export default ItemModal;
