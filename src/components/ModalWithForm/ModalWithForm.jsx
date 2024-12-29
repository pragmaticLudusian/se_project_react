import "./ModalWithForm.css";
import "/src/blocks/form.css";

function ModalWithForm(props) {
  return (
    <form
      action=""
      className={`modal modal_type_${props.name} modal_opened`}
      name={`${props.name}`}
    >
      <div className="modal__window">
        <p className="modal__title">{props.title}</p>
        <button type="button" className="modal__close-button" />
        {
          /* any element that is fed from the invoking component (usually parent components) will show up here; here it acts as a placeholder */
          props.children
          /* the rest of the elements outside of props.children are used for default OOBE building for the component in question */
        }
        <button
          type="submit"
          className="modal__submit-button modal__submit-button_inactive"
          disabled
        >
          {props.buttonText}
        </button>
      </div>
    </form>
  );
}

export default ModalWithForm;
