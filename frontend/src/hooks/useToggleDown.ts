import { useRef, useState, useEffect } from "react";
import { useModalOpened } from "@/context/ModalOpenedContext";

export default function useToggleDropdown() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState(false);

  const { openLayer, closeLayer } = useModalOpened();

  const openMenu = () => {
    if (!open) {
      setOpen(true);
      openLayer();
    }
  };

  const closeMenu = () => {
    if (open) {
      setOpen(false);
      closeLayer();
    }
  };

  const toggle = () => {
    open ? closeMenu() : openMenu();
  };

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;

      if (
        menuRef.current?.contains(target) ||
        btnRef.current?.contains(target)
      ) {
        return;
      }

      closeMenu();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return {
    openMenu,
    open,
    toggle,
    close: closeMenu,
    menuRef,
    btnRef,
  };
}