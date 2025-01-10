import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm(props) {
  useEffect(() => {
    window.addEventListener("keydown", handleModalClose); // hMC here refers to the internal func WHEN it's time to close the modal window
    document
      .querySelector(".form-modal")
      .addEventListener("click", handleModalClose); // components allow only one modal to be opened, so it should be unique enough

    function handleModalClose(event) {
      // covers 2 of 3 ways to close the modal window: keyboard and clicking outside the modal window (x button is the onClick event of said button)
      if (
        event.key === "Escape" ||
        event.target.classList.contains("form-modal")
      )
        props.onClose(); // this is the final step that would properly close the modal window, different from the wrapping func here
    }

    return () => {
      window.removeEventListener("keydown", handleModalClose); // only event necessary to remove to avoid surplus keystrokes
      // console.log(document.forms[props.name]); // strangely gets invoked during mounting AND unmounting (but undef)
    };
  });

  return (
    <div className={`form-modal form-modal_type_${props.name}`}>
      <form action="" className="form-modal__window" name={props.name}>
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
          className="form-modal__submit-btn form-modal__submit-btn_active"
        >
          {props.buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
