import { RefObject } from "react";

export const useDropdownPosition = (ref: RefObject<HTMLDivElement | null>) => {
  const getDropdownPosition = () => {
    if (!ref.current)
      return { top: 0, left: 0 }

    const clientRect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240;

    // Calcuate the initial position
    let left = clientRect.left + window.scrollX;
    const top = clientRect.bottom + window.scrollY;

    // Check if the dropdown would go off the right edge
    if (left + dropdownWidth > window.innerWidth) {
      // Align to the right edge of the button instead
      left = clientRect.right + window.scrollX - dropdownWidth;

      // If still off-screen, alight ot the right edge of the viewport
      // with some padding.
      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16;
      }
    }

    if (left < 0) {
      left = 16;
    }

    return { left, top }
  }

  return { getDropdownPosition }
}
