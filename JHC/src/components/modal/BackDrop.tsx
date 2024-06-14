/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'

interface IBackDrop {
  onClose: () => void;
}
export default function BackDrop({ onClose }: IBackDrop) {
  const handleBackDropClick = (e: any) => {
    if (e.target.classList.contains("modal-backdrop")) {
      onClose();
    }
  };
  return (
    <div
      className="modal-backdrop fixed left-0 top-0 bg-black w-full h-screen opacity-70"
      onClick={handleBackDropClick}
    ></div>
  );
}
