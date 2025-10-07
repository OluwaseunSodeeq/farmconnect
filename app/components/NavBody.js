"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useOpenContext from "../contexts/useOpenContext";

function CurrentNav({ to, onClick, children }) {
  const pathname = usePathname();
  const isActive = pathname === to;

  const className = isActive
    ? "text-blue-text font-bold"
    : "text-btn-text-color hover:text-blue-text";

  return (
    <span className="text-base lg:leading-6 lg:font-normal">
      <Link href={to} onClick={onClick} className={className}>
        {children}
      </Link>
    </span>
  );
}

function Navbody({ bg, textColor }) {
  const { setOpen } = useOpenContext();

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <div
      className="w-[104%] left-1/2 transform -translate-x-1/2 h-screen  px-6 absolute top-[20px] md:top-[18px] z-30 lg:hidden"
      style={{ backgroundColor: bg, color: textColor }}
    >
      <ul className="flex h-auto flex-col gap-0 items-center justify-start">
        <li className="flex justify-between items-center pl-6 pr-3 font-medium w-full h-[48px] border-t-2 border-btn-text-color-400 font-quicksand text-base leading-[32px] text-btn-text-color hover:text-blue-text">
          <CurrentNav onClick={closeHandler} to="/home">
            HOME
          </CurrentNav>
          <div onClick={closeHandler}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#333437"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </li>

        <li className="flex items-center pl-6 font-medium w-full h-[48px] border-t-2 border-b-2 border-btn-text-color-400 font-quicksand text-base leading-[32px] text-btn-text-color hover:text-blue-text">
          <CurrentNav onClick={closeHandler} to="/about">
            ABOUT
          </CurrentNav>
        </li>

        <li className="flex items-center pl-6 font-medium w-full h-[48px] border-b-2 border-btn-text-color-400 font-quicksand text-base leading-[32px] text-btn-text-color hover:text-blue-text">
          <CurrentNav onClick={closeHandler} to="/impact">
            IMPACT
          </CurrentNav>
        </li>
      </ul>
    </div>
  );
}

export default Navbody;
