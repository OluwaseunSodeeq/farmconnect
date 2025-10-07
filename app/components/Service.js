"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "../css-files/Service.css";
import { serviceData } from "../data";
import Link from "next/link";

// import secImg from "@/public/images/TriasseaIcon.png";

export default function Service() {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSlidesPerView = () => {
    if (screenWidth <= 400) return 1;
    if (screenWidth <= 540) return 2;
    return 3;
  };

  return (
    <section className="service-div">
      <div className="lg:mt-20">
        <div className="">
          <span className="flex justify-center items-center gap-2">
            <Image
              className="w-8"
            //   src={secImg}
              src="/images/TriasseaIcon.png"
              alt="Triassea Icon"
              width={32}
              height={32}
            />
            <h3 className="flex justify-center items-center text-xl md:text-xl lg:text-2xl antialiased font-sans">
              Our Service
            </h3>
          </span>
          <h1 className="hedding flex justify-center items-center text-xl md:text-3xl lg:text-4xl antialiased font-sans">
            What We Provide
          </h1>
        </div>
      </div>

      <div className="px-[6%]">
        <Swiper
          slidesPerView={getSlidesPerView()}
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
        >
          {serviceData.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="bg-green-900 rounded-lg text-black transform transition-all ease-in-out duration-300 hover:text-white">
                <Link href="/" className="flex flex-col text-3xl mt-4">
                  <div className="relative w-full h-64">
                    <Image
                        src={slide.imageUrl}
                        alt={slide.altText}
                        fill
                        className="object-cover rounded-lg"
                    />
                    </div>
                  <span className="block text-base md:text-lg mt-4 md:mt-8 mb-4 md:mb-6 ml-4 md:ml-4 text-white">
                    {slide.linkText}
                  </span>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
