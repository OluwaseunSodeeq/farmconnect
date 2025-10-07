"use client";
import { createContext, useState } from "react";

const OpenContextData = createContext();

function OpenContextProvider({ children }) {
  const [open, setOpen] = useState(false);

  const hamburgerHandler = () => setOpen(!open);

  return (
    <OpenContextData.Provider value={{ open, setOpen, hamburgerHandler }}>
      {children}
    </OpenContextData.Provider>
  );
}
//
export { OpenContextProvider, OpenContextData };
