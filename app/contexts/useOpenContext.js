"use client";
import { useContext } from "react";
import { OpenContextData } from "./OpenContext";

function useOpenContext() {
  const context = useContext(OpenContextData);
  if (context === undefined)
    throw new Error("open context was used outside Open context provider");

  return context;
}

export default useOpenContext;
