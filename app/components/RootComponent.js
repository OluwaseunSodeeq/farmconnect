"use client";

import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Page from "../login/page";

function Parent({ children }) {
  return <div>{children}</div>;
}

export default function RootComponent({ children }) {
  const [authentication, setAuthentication] = useState(false);

  return (
    <section className="w-full">
      {authentication ? (
        <>
          <Navbar />
          <Parent>{children}</Parent>
          <Footer />
        </>
      ) : (
        <Page setAuthentication={setAuthentication} />
      )}
    </section>
  );
}
