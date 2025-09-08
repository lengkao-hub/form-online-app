/* eslint-disable arrow-parens */
/* eslint-disable max-nested-callbacks */
/* eslint-disable curly */
import { RefObject, useEffect } from "react";

export const useHandleEnterNavigation = (formRef: RefObject<HTMLFormElement>) => {
  useEffect(() => {
    const formEl = formRef.current;
    if (!formEl) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") {
        return
      }

      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.tagName === "TEXTAREA" || target.tagName === "BUTTON") return;

      e.preventDefault();

      const focusables = Array.from(
        formEl.querySelectorAll<HTMLElement>(
          "input, select, textarea, button, [role='combobox'], [data-radix-select-trigger], [tabindex]:not([tabindex='-1'])",
        ),
      ).filter(el => !el.hasAttribute("disabled") && el.offsetParent !== null);

      const index = focusables.indexOf(target);
      if (index > -1 && focusables[index + 1]) {
        focusables[index + 1].focus();
      }
    };

    formEl.addEventListener("keydown", handleKeyDown);
    return () => formEl.removeEventListener("keydown", handleKeyDown);
  }, [formRef]);
};
