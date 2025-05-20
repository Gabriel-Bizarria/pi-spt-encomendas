import React from "react";

const FloatingButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 bg-green-900 hover:bg-green-800 text-white rounded-lg shadow-lg flex items-center justify-center text-2xl z-50"
    >
      +
    </button>
  );
};

export default FloatingButton;
