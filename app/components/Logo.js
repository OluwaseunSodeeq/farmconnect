"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="ml-0 xl:ml-10 2xl:ml-0">
      <Link href="/home">
        <h2 className="italic color-dark-green">FConnect</h2>
      </Link>
    </div>
  );
}
