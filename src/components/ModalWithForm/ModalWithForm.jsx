import { useEffect } from "react";
import "./ModalWithForm.css";
import "/src/blocks/form.css";

function ModalWithForm(props) {
  useEffect(() => {
    window.addEventListener("keydown", onClose); // onClose here refers to the internal func WHEN it's time to close the modal window
    document.forms[props.name].addEventListener("click", onClose);

    function onClose(event) {
      // covers 2 of 3 ways to close the modal window: keyboard and clicking outside the modal window (x button is the onClick event of said button)
      // console.log(event.key);
      if (event.key === "Escape" || event.target.classList.contains("modal"))
        props.onClose(); // this is the final step that would properly close the modal window, different from the wrapping func here
    }

    return () => {
      window.removeEventListener("keydown", onClose); // only event necessary to remove to avoid surplus keystrokes
      // console.log(document.forms[props.name]); // strangely gets invoked during mounting AND unmounting (but undef)
    };
  });

  return (
    <form
      action=""
      className={`modal modal_type_${props.name}`}
      name={`${props.name}`}
    >
      <div className="modal__window">
        <p className="modal__title">{props.title}</p>
        <button
          type="button"
          className="modal__close-button"
          onClick={props.onClose} // another way to close the modal window
        />
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
