import React from "react";

export default function Wrapper({ children, bg }) {
  return (
    <section
      className={` border-2 p-0 m-0 2xl:max-w-[1400px] mx-auto  box-border bg-${bg}`}
    >
      {children}
    </section>
  );
}
