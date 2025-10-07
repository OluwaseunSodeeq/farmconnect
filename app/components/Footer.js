"use client";
import {
  AiOutlineWhatsApp,
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineYoutube,
  AiOutlineFacebook,
} from "react-icons/ai";
import Link from "next/link";
import "../css-files/Footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer__addr">
          <h1 className="footer__logo">Agricultural Dynamics</h1>

          <h2>Contact</h2>

          <address>
            Farm Plot No: 363, Near Crops Overbridge Agriville
            <br />
            Agriculture City, Harvestland-752054
            <br />
            <div className="flex gap-2 p-4 cursor-pointer">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <AiOutlineWhatsApp className="socialmedia-icons" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <AiOutlineInstagram className="socialmedia-icons" />
              </a>
              <a href="mailto:agriculture@gmail.com" target="_blank" rel="noopener noreferrer">
                <AiOutlineMail className="socialmedia-icons" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <AiOutlineFacebook className="socialmedia-icons" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <AiOutlineYoutube className="socialmedia-icons" />
              </a>
            </div>
          </address>
        </div>

        <ul className="footer__nav">
          <li className="nav__item">
            <h2 className="nav__title">Agricultural Media</h2>

            <ul className="nav__ul">
              <li><a href="#">Crop Management</a></li>
              <li><a href="#">Soil Health</a></li>
              <li><a href="#">Agricultural Technology</a></li>
              <li><a href="#">Environmental Impact</a></li>
              <li><a href="#">Field Survey & Mapping</a></li>
            </ul>
          </li>

          <li className="nav__item nav__item--extra">
            <Link href="/about" className="nav__title">
              About Agriculture
            </Link>

            <ul className="nav__ul nav__ul--extra">
              <li><Link href="/">Our Farming Mission & Vision</Link></li>
              <li><Link href="/">Expert Agriculturists</Link></li>
              <li><Link href="/contactUs">Contact Our Farm</Link></li>
            </ul>
          </li>

          <li className="nav__item">
            <h2 className="nav__title">Agricultural Legal</h2>

            <ul className="nav__ul">
              <li><a href="#">Farm Privacy Policy</a></li>
              <li><a href="#">Terms of Agricultural Use</a></li>
              <li><a href="#">Farm Sitemap</a></li>
            </ul>
          </li>
        </ul>

        <div className="legal">
          <p>&copy; {new Date().getFullYear()} Agricultural Dynamics. All rights reserved.</p>

          <div className="legal__links">
            <span>
              Cultivated with <span className="heart">♥</span> to build a strong agricultural community.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
