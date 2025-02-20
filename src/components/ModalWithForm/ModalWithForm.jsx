import { useState } from "react";
import { useEscape } from "../../utils/customHooks";
import "./ModalWithForm.css";

function ModalWithForm(props) {
  useEscape(props.onClose);

  function handleOverlay(event) {
    // more efficient than querySelector to close outside the modal window
    event.target.classList.contains("form-modal") && props.onClose();
  }

  return (
    <div
      className={`form-modal form-modal_type_${props.name}`}
      onClick={handleOverlay}
    >
      <form
        action=""
        className="form-modal__window"
        name={props.name}
        onSubmit={props.onSubmit}
        noValidate
      >
        <h2 className="form-modal__title">{props.title}</h2>
        <button
          type="button"
          className="form-modal__close-btn"
          onClick={props.onClose} // another way to close the modal window
        />
        {
          /* any element that is fed from the invoking component (usually parent components) will show up here; here it acts as a placeholder */
          props.children
          /* the rest of the elements outside of props.children are used for default OOBE building for the component in question */
        }
        <button
          type="submit"
          className="form-modal__submit-btn"
          disabled={props.isValid ? false : true} // unlike HTML, this supports boolean state (false means disable the disabled flag/double-negative)
        >
          {props.buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
