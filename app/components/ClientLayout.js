"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import RootComponent from "./RootComponent"; // 
import { OpenContextProvider } from "../contexts/OpenContext";

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <OpenContextProvider>
        <main>
          <RootComponent>{children}</RootComponent>
        </main>
      </OpenContextProvider>
    </SessionProvider>
  );
}
