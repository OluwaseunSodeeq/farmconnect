"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css-files/Testimonial.css";
import { GoStarFill } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";

const testimonialData = [
  {
    description:
      "Synth chartreuse iPhone lomo cray raw denim brunch everyday carry neutra before they sold out fixie 90's microdosing. Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard pabst authentic iceland.",
    imgurl: "https://dummyimage.com/106x106",
    name: "Holden Caulfield",
    profasion: "UI DEVELOPER",
  },
  {
    description:
      "Synth chartreuse iPhone lomo cray raw denim brunch everyday carry neutra before they sold out fixie 90's microdosing. Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard pabst authentic iceland.",
    imgurl: "https://dummyimage.com/106x106",
    name: "Holden Caulfield",
    profasion: "UI DEVELOPER",
  },
  {
    description:
      "Synth chartreuse iPhone lomo cray raw denim brunch everyday carry neutra before they sold out fixie 90's microdosing. Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard pabst authentic iceland.",
    imgurl: "https://dummyimage.com/106x106",
    name: "Holden Caulfield",
    profasion: "UI DEVELOPER",
  },
  {
    description:
      "Synth chartreuse iPhone lomo cray raw denim brunch everyday carry neutra before they sold out fixie 90's microdosing. Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard pabst authentic iceland.",
    imgurl: "https://dummyimage.com/106x106",
    name: "Holden Caulfield",
    profasion: "UI DEVELOPER",
  },
];

export default function Testimonial() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Handle window access safely (client-only)
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
          Testimonials
        </h1>

        <div className="md:px-4 p-1 py-6 testimonial-box">
          <Slider {...settings}>
            {testimonialData.map((elm, index) => (
              <div
                key={index}
                className="md:p-4 p-2 md:w-1/2 w-full bg-transparent"
              >
                <div
                  className={`h-full text-black p-8 rounded-lg ${
                    index % 2 === 0 ? "card-test" : "card-test2"
                  } shadow-lg`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="block w-5 h-5 text-green-900 mb-4"
                    viewBox="0 0 975.036 975.036"
                  >
                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                  </svg>

                  <div className="flex gap-2 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <GoStarFill
                        key={i}
                        size={17}
                        className="text-yellow-500"
                      />
                    ))}
                  </div>

                  <h3 className="text-black font-semibold text-2xl mt-1">
                    heading
                  </h3>
                  <p className="leading-relaxed mb-6">{elm.description}</p>
                  <Link href="/" className="inline-flex items-center">
                    <Image
                    width={50}
                    height={50}
                      alt="testimonial"
                      src={elm.imgurl}
                      className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium">{elm.name}</span>
                      <span className="text-orange-300 text-sm">
                        {elm.profasion}
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
