import React from "react";

type Props = { open: boolean };
function Modal({ open }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] grid place-items-center bg-[rgba(20,16,12,0.45)] backdrop-blur-sm "
      role="dialog"
      aria-modal="true"
      aria-label="Processing"
    >
      <div className="rounded-full bg-[#FFF7EE] px-10 py-8 shadow-2xl ring-1 ring-black/5">
        <p className="text-lg text-zinc-900">Processing...</p>
      </div>
    </div>
  );
}

export default Modal;
