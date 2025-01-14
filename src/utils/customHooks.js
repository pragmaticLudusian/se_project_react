import { useEffect } from "react";

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
