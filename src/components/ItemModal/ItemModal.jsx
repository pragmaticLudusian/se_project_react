import { useEscape } from "../../utils/customHooks";
import "./ItemModal.css";

function ItemModal(props) {
  useEscape(props.onClose);

  function handleOverlay(event) {
    event.target.classList.contains("item-modal") && props.onClose();
  }

  return (
    <div className="item-modal" onClick={handleOverlay}>
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
