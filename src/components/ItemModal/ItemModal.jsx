import { useModalClose } from "../../utils/customHooks";
import "./ItemModal.css";

function ItemModal(props) {
  const { name, imageUrl, weather } = props.itemCardData;

  useModalClose(props.isOpen, props.onClose);

  return (
    <div className="modal item-modal">
      <div className="item-modal__window">
        <button
          type="button"
          className="item-modal__close-btn"
          onClick={props.onClose}
        />
        <div className="item-modal__card-container">
          <img src={imageUrl} alt={name} className="item-modal__image" />
          <div className="item-modal__header">
            <p className="item-modal__header-name">{name}</p>
          </div>
        </div>
        <div className="item-modal__text-container">
          <p className="item-modal__description">Weather: {weather}</p>
          <div className="item-modal__text-name-container">
            <p className="item-modal__text-name">{name}</p>
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
    </div>
  );
}

export default ItemModal;
