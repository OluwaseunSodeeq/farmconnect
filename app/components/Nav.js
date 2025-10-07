"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Nav({ nav }) {
  const activePage = usePathname();

  return (
    <div>
      <ul className="hidden xl:flex gap-[1.5rem]">
        {nav?.map((item, i) => {
          const active = activePage === item.href;

          return (
            <li key={i}>
              <Link
                href={item.href}
                className={`flex gap-1 items-center  bg-navbar-bg px-4 py-2 text-dark-green rounded-full shadow-sm  transition  font-montserrat hover:underline ${
                  active ? "font-bold" : "font-medium"
                }`}
              >
                <span
                  className={`${
                    active ? "w-1 h-1 bg-dark-green rounded-[50%]" : ""
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
