import { useCallback, useEffect, useState } from "react";

export function useModalClose(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return; // no open modal means don't process further

    const handleEscape = (event) => {
      // for const funcs, lexically this must be before the event listener
      event.key === "Escape" && onClose();
    };

    const handleOverlay = (event) => {
      // more efficient than querySelector to close outside the modal window
      event.target.classList.contains("modal") && onClose();
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleOverlay);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mouse", handleOverlay);
    };
  }, [isOpen, onClose]); // watch isOpen to add the listeners only when the modal is open
}

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(event) {
    const { name, value, validationMessage } = event.target;
    setValues((oldValues) => {
      return { ...oldValues, [name]: value };
    }); // this alone doesn't prevent stale states - the || in the input's value does
    setErrors((oldErrors) => {
      return { ...oldErrors, [name]: validationMessage };
    });
    setIsValid(event.target.closest("form").checkValidity());
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  };
}
