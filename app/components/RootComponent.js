import React from "react";
// import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function RootComponent({ children }) {
  return (
    <section className="w-full">
      <section className="w-full  ">
        <Navbar />
        <div>{children}</div>
        <Footer />
      </section>
    </section>
  );
}
