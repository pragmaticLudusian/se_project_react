import { useModalClose } from "../../utils/customHooks";
import "./ModalWithForm.css";

function ModalWithForm(props) {
  useModalClose(props.isOpen, props.onClose);

  return (
    <div
      className={`modal form-modal form-modal_type_${props.name}`}
      // onClick={props.onClose} // already handled in useModalClose
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
