import { useEscape } from "../../utils/customHooks";
import "./DeleteConfirmModal.css";

function DeleteConfirmModal(props) {
  const { name } = props.itemCardData;

  useEscape(props.onClose);

  function handleOverlay(event) {
    event.target.classList.contains("delete-confirm-modal") && props.onClose();
  }

  return (
    <div className="delete-confirm-modal" onClick={handleOverlay}>
      <div className="delete-confirm-modal__window">
        <button
          type="button"
          className="delete-confirm-modal__close-btn"
          onClick={props.onClose}
        />
        <p className="delete-confirm-modal__msg">
          Are you sure you want to delete this item?
        </p>
        <p className="delete-confirm-modal__msg">{name}</p>
        <p className="delete-confirm-modal__msg">
          This action is irreversible.
        </p>
        <button
          type="button"
          className="delete-confirm-modal__btn delete-confirm-modal__btn_ok"
          onClick={props.onDeleteItem}
        >
          {props.buttonText}
        </button>
        <button
          type="button"
          className="delete-confirm-modal__btn"
          onClick={props.onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
