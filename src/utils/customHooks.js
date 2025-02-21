import { useCallback, useEffect, useState } from "react";

export function useEscape(closeModal) {
  useEffect(() => {
    const handleEscape = (event) => {
      // for const funcs, lexically this must be before the event listener
      event.key === "Escape" && closeModal();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);
}

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(false);

  function handleChange(event) {
    const { name, value, validationMessage } = event.target;
    setValues((oldValues) => {
      return { ...oldValues, [name]: value };
    });
    setErrors((oldErrors) => {
      return { ...oldErrors, [name]: validationMessage };
    });
    setValid(event.target.closest("form").checkValidity());
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setValid(newIsValid);
    },
    [setValues, setErrors, setValid]
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  };
}
