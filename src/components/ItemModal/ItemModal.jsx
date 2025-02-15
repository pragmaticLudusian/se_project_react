import { useEscape } from "../../utils/customHooks";
import "./ItemModal.css";

function ItemModal(props) {
  const { name, link, weather } = props.itemCardData;

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
        <div className="item-modal__card-container">
          <img src={link} alt={name} className="item-modal__image" />
          <div className="item-modal__header">
            <p className="item-modal__name">{name}</p>
          </div>
        </div>
        <div className="item-modal__text-container">
          <p className="item-modal__description">Weather: {weather}</p>
          <button
            type="button"
            className="item-modal__delete-btn"
            onClick={props.openDeleteConfirm}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
