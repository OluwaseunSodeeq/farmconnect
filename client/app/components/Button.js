import React from "react";

export default function Button({ children, btnBg, textColor }) {
  return (
    <div>
      <button
        style={{ backgroundColor: btnBg, color: textColor }}
        className={` cursor-pointer text-medium px-6 py-2 rounded-full shadow-sm transition `}
      >
        {children}
      </button>
    </div>
  );
}
