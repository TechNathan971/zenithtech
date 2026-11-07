import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
};

export function Modal({ open, onClose, label, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  // Open or close the native <dialog>
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Stop the page scrolling behind the open dialog
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        // a click on the dimmed backdrop targets the dialog element itself
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(100%-2rem,60rem)] overflow-y-auto rounded-card border-0 bg-white p-0 text-ink-700 shadow-float backdrop:bg-ink-950/60 open:animate-fade-up"
    >
      {open && (
        <>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full bg-white/90 text-ink-700 shadow-card hover:bg-white hover:text-ink-950"
          >
            <X aria-hidden className="size-5" />
          </button>
          {children}
        </>
      )}
    </dialog>
  );
}
