import { Mail, Facebook, Twitter, Instagram } from "lucide-react";
import Button from "./Button";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-dark-green text-main-bg px-6 md:px-16 lg:px-24 py-12">
      {/* Top message row */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/20 pb-8">
        <div className=" flex gap-x-6 p-2">
          <div className="w-[3rem] h-[3.2rem] relative">
            <Image
              fill
              src="/white-logo.png"
              alt="white-logo"
              className="object-contain"
            />
          </div>
          <p className="text-center md:text-left text-xl md:text-base xl:w-[22.2rem]">
            We’re only one call away. Literally! And just a few emails away too.
          </p>
        </div>
        <Button btnBg="#fdcd31" textColor="#012f25">
          Contact Us
        </Button>
      </div>

      {/* Middle section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
        {/* Newsletter */}
        <div className="md:col-span-2">
          <h3 className="font-semibold text-xl mb-3 w-[10.2rem] ">
            Subscribe to our newsletter
          </h3>
          <div className="w-[15.6 rem] flex border-b border-t rounded-sm border-white/40 items-center">
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent outline-none py-2 text-sm flex-1 placeholder:text-white/60"
            />
            <button className="cursor-pointer bg-yellow text-black p-2 rounded-sm hover:bg-yellow">
              →
            </button>
          </div>
        </div>

        {/* Links */}
        <div>
          <ul className="space-y-3 text-sm">
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Impact</li>
          </ul>
        </div>
        <div>
          <ul className="space-y-3 text-sm">
            <li>Our Story</li>
            <li>Join Us</li>
            <li>Project Gallery</li>
          </ul>
        </div>
        <div>
          <ul className="space-y-3 text-sm">
            <li>Support Us</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-30 flex flex-col md:flex-row justify-between items-center text-sm text-white/70 gap-6">
        <p>Privacy Policy</p>
        <div className="flex gap-12">
          <p>+234 810 5810 398 CLEMESET</p>
          <p> projectclimeset@gmail.com</p>
          <div className="flex space-x-4">
            <Facebook className="w-5 h-5 cursor-pointer text-white" />
            <Twitter className="w-5 h-5 cursor-pointer text-white" />
            <Instagram className="w-5 h-5 cursor-pointer text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}
