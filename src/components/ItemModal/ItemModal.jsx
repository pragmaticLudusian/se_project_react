import { useEffect } from "react";
import "./ItemModal.css";

function ItemModal(props) {
  useEffect(() => {
    window.addEventListener("keydown", onClose);
    document.querySelector(".item-modal").addEventListener("click", onClose);

    function onClose(event) {
      if (
        event.key === "Escape" ||
        event.target.classList.contains("item-modal")
      ) {
        props.onClose();
      }
    }

    return () => {
      window.removeEventListener("keydown", onClose);
    };
  });

  return (
    <div className="item-modal">
      <div className="item-modal__window">
        <button
          type="button"
          className="item-modal__close-button"
          onClick={props.onClose}
        />
        {props.children}
      </div>
    </div>
  );
}

export default ItemModal;
