import React from "react";

const PreviewModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleClickOutside = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
        <button
          className="absolute top-2 right-4 text-gray-600"
          onClick={onClose}
        >
          &#x2716;
        </button>
        {children}
      </div>
    </div>
  );
};

export default PreviewModal;
