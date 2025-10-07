"use client";
import React from "react";
import Nav from "./Nav";
import Logo from "./Logo";
import Wrapper from "./Wrapper";
import DropDown from "./DropDown";
import Button from "./Button";
import useOpenContext from "../contexts/useOpenContext";
import Hamburger from "./Hamburger";
import Navbody from "./NavBody";

export default function Header() {
  const { open } = useOpenContext();

  const navs = [
    { name: "Home", href: "/home", activesStatus: false },
    { name: "About", href: "/about", activesStatus: false },
    { name: "Impact", href: "/impact", activesStatus: false },
  ];
  const dropDown1 = [
    "Project",
    "Features",
    "Solutions",
    "Case Studies",
    "Resources",
    "Pricing",
  ];

  const dropDown2 = [
    "Gallery",
    "Blog",
    "Events",
    "Newsletter",
    "Help Center",
    "Guides",
    "Webinars",
  ];

  const bg = "#ffffff";
  const btnBg = "#012f25";

  return (
    <div className="w-full shadow-md ">
      <Wrapper bg={bg}>
        <div>
          <div className="  flex justify-between items-center px-[1rem] xl:px-[5rem] py-3.5  2xl:px-[7rem]">
            <div className=" block xl:hidden">
              <Logo />
            </div>
            <Nav nav={navs} />
            <div className="hidden xl:block xl:ml-[5rem]">
              <Logo />
            </div>

            <div className="hidden  xl:flex gap-[2rem]">
              <DropDown options={dropDown1} />
              <DropDown options={dropDown2} />
              <Button btnBg={btnBg} textColor={bg}>
                Contact Us
              </Button>
            </div>
            <div className=" block xl:hidden">
              <Hamburger />
            </div>
          </div>

          <div
            className={`fixed top-0 right-0 h-screen w-[80%] max-w-sm bg-white shadow-lg z-20 transform duration-500 ease-in-out ${
              open ? "translate-x-0" : "translate-x-[200%] "
            }`}
          >
            <Navbody bg="#ffffff" textColor="#012f25" />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
