"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiMenu2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { signOut } from "next-auth/react"; // 🟢 FIX: import signOut
import "../css-files/Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [More, setMore] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // spinner state

  useEffect(() => {
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

  // 🧩 Logout handler
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({
        redirect: true, // automatically go to login page
        callbackUrl: "/login", // after logout
      });
    } catch (err) {
      console.error("❌ Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleMenuBar = () => setMenu(!menu);
  const hideNavItems = () => setMenu(false);

  return (
    <div
      className={`w-[100%] max-w-[2600px] h-[60px] responsive-header pl-6 pr-20 ${
        isScrolled ? "scrolled" : "no-scrolled"
      } ${menu ? "bg-white max-h-max" : ""} fixed top-0  z-10`}
    >
      <header className="h-full w-full box-border flex justify-between items-center ">
        {/* Logo */}
        <div className="flex items-center h-[70px] w-auto">
  <Link href="/" className="relative flex items-center">
    <Image
      src="/images/logo.png"
      alt="Logo"
      width={isMobile ? 40 : 120}     
      height={isMobile ? 40 : 60}       
      priority                           
      className="object-contain cursor-pointer"
    />
  </Link>
</div>

        {/* Mobile Menu Toggle */}
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

        {/* Nav Items */}
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
            <Link
              href="/"
              className={`${isScrolled ? "nav-item" : "nav-item-hover"}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className={`${isScrolled ? "nav-item" : "nav-item-hover"}`}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`${isScrolled ? "nav-item" : "nav-item-hover"}`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`${isScrolled ? "nav-item" : "nav-item-hover"}`}
            >
              Contact Us
            </Link>
          </li>

          {/* Logout Button */}
          <li>
            <button
              onClick={handleLogout}
              className={`${isScrolled ? "nav-item" : "nav-item-hover"} flex items-center gap-1`}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span>Logging out...</span>
                </>
              ) : (
                "Logout"
              )}
            </button>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;

