"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiMenu2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { IoChevronDownOutline } from "react-icons/io5";
import Link from "next/link";
// import logo from "@/public/images/logo.png";
import "../css-files/Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [More, setMore] = useState(false);

  useEffect(() => {
    // Set initial screen width on client side only
    setIsMobile(window.innerWidth <= 768);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      setMore(false);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenuBar = () => setMenu(!menu);
  const hideNavItems = () => setMenu(false);

  return (
    <div
      className={`w-[100%] max-w-[2600px] h-[60px] responsive-header pl-6 pr-20 ${
        isScrolled ? "scrolled" : "no-scrolled"
      } ${menu ? "bg-white max-h-max" : ""} fixed top-0 z-10`}
    >
      <header className="h-full w-full box-border flex justify-between items-center">
        <Image
          src="/images/logo.png"
          alt="Logo"
          className={`${
            isMobile
              ? "w-[40px] h-[34px]"
              : "w-[100px] h-[100px] object-cover logo-img"
          } cursor-pointer`}
          width={100}
          height={100}
          onClick={() => {}}
        />

        {isMobile && (
          <>
            {menu ? (
              <RxCross2
                cursor="pointer"
                color={isScrolled ? "black" : "white"}
                size={25}
                onClick={toggleMenuBar}
              />
            ) : (
              <RiMenu2Fill
                cursor="pointer"
                size={25}
                color={isScrolled ? "black" : "white"}
                onClick={toggleMenuBar}
              />
            )}
          </>
        )}

        <ul
          onClick={hideNavItems}
          className={
            isMobile
              ? `flex flex-col gap-2 nav-bg py-3 w-full absolute h-max top-[50px] ${
                  !menu
                    ? "-right-[100%]"
                    : "right-0 transition-all .5s ease-in"
                } items-center text-lg cursor-pointer scrolled`
              : `flex justify-between items-center gap-10 nav-text ${
                  isScrolled ? "text-black" : "text-white"
                }`
          }
        >
          <li>
            <Link href="/" className={`${isScrolled ? "nav-item" : "nav-item-hover"}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" className={`${isScrolled ? "nav-item" : "nav-item-hover"}`}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/aboutus" className={`${isScrolled ? "nav-item" : "nav-item-hover"}`}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contactUs" className={`${isScrolled ? "nav-item" : "nav-item-hover"}`}>
              Contact Us
            </Link>
          </li>

          <li className="relative group">
            <button
              onClick={() => setMore(!More)}
              className={`${isScrolled ? "nav-item" : "nav-item-hover"} ${
                isMobile ? "hidden" : ""
              } flex items-center gap-1`}
            >
              More
              <IoChevronDownOutline
                size={17}
                className={`${More ? "rotate-nav-icon" : ""}`}
              />
            </button>

            <ul
              className={`${
                isMobile
                  ? "flex flex-col text-black items-center gap-2"
                  : `absolute ${
                      More ? "block" : "hidden"
                    } max-w-max whitespace-nowrap space-y-2 py-2 px-4 -right-14 rounded`
              } ${
                !isScrolled && !isMobile
                  ? "no-scrolled"
                  : "bg-white text-black"
              }`}
              onClick={() => setMore(false)}
            >
              <li><Link href="/gallery" className={`${isScrolled ? "nav-item" : "nav-item-hover"}`}>Gallery</Link></li>
              <li><Link href="/partnership" className={`${isScrolled ? "nav-item" : "nav-item-hover"}`}>Partners</Link></li>
              <li><Link href="/involved" className={`${isScrolled ? "nav-item" : "nav-item-hover"}`}>Involved</Link></li>
              <li><Link href="/presskit" className={`${isScrolled ? "nav-item" : "nav-item-hover"}`}>Press Kit</Link></li>
              <li><Link href="/successstories" className={`${isScrolled ? "nav-item" : "nav-item-hover"}`}>Impact</Link></li>
              <li><Link href="/ourapproach" className={`${isScrolled ? "nav-item" : "nav-item-hover"}`}>Our Approach</Link></li>
              <li><Link href="/faq" className={`${isScrolled ? "nav-item" : "nav-item-hover"}`}>FAQ</Link></li>
            </ul>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;
