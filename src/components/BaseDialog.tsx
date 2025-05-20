import { useEffect, useRef } from "react";

export default function BaseDialog({
  isOpen,
  className,
  children,
}: BaseDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={`rounded-lg p-6 backdrop:bg-black/50 ${className ?? ""}`}
    >
      {children}
    </dialog>
  );
}

export interface BaseDialogProps {
  isOpen: boolean;
  className?: string;
  children?: React.ReactNode;
}
