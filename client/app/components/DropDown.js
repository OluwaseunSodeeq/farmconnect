"use client";
import { useState } from "react";
// import { ChevronDown } from "lucide-react";
// import Image from "next/image";

export default function DropDown({ options }) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex items-center gap-2 bg-navbar-bg text-green-800 font-medium px-4 py-2 font-montserrat rounded-full shadow-sm  transition"
      >
        {selectedOption}
        {/* <Image
          width={16}
          height={16}
          src="/dropdown-icon.png"
          alt="dropdown icon"
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        /> */}
      </button>

      {open && (
        <ul className="absolute left-0 mt-2 w-40 bg-navbar-bg border border-gray-200 rounded-lg shadow-lg py-2 z-10">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedOption(option);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
