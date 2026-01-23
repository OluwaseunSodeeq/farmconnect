'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../css-files/About.css";

const AboutSection = () => {
  const dataArray = [
    {
      image: "/images/about us1.png",
      tag: "Agriculture & Foods",
      description:
        "A picturesque farm with golden fields of wheat and a traditional barn.",
    },
    {
      image: "/images/about us2.png",
      tag: "Vegetables & Fruits",
      description:
        "Colorful assortment of fresh fruits and vegetables on a wooden table.",
    },
    {
      image: "/images/about us3 (1).png",
      tag: "Food Beverage",
      description:
        "From crisp vegetables to juicy fruits, our Food Beverage offerings showcase the vibrant richness of nature’s bounty.",
    },
    {
      image: "/images/about us4.png",
      tag: "Animal Nutrition",
      description:
        "Healthy animal feed in a bowl, providing essential nutrients for livestock.",
    },
  ];

  return (
    <section className="grid grid-cols-1 mt-20 mr-10 gap-20 md:grid-cols-2 lg:grid-cols-2">
      {/* Left Section */}
      <div className="md:ml-8 lg:ml-2">
        <span className="flex justify-start ml-6 items-center gap-2">
          <Image
            src="/images/TriasseaIcon.png"
            alt="Triassea Icon"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <h3 className="text-xl md:text-2xl lg:text-3xl antialiased font-sans">
            About Us
          </h3>
        </span>

        <h1 className="mb-4 ml-6 text-xl lg:text-5xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Organic & Healthy Food
        </h1>

        <p className="text-gray-500 ml-6 mb-4 text-sm md:text-base lg:text-lg">
          At [Our Company Name], we are passionate about promoting a healthy
          lifestyle through the consumption of organic and healthy food.
          Committed to the well-being of our customers, we source only the
          finest organic ingredients to create a range of wholesome products.
          Join us on a journey towards nourishing your body and supporting a
          sustainable, organic future.
        </p>

        <div className="px-4">
          {dataArray.map((data, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-center items-center gap-3 mb-4 md:mb-8 lg:mb-10 mr-3 md:mr-6"
            >
              <Image
                src={data.image}
                alt={data.tag}
                width={100}
                height={100}
                className="rounded-full bg-lime-100 hover:bg-orange-300 ml-3 md:ml-0 cursor-pointer transition-transform duration-500 hover:scale-110"
              />
              <div className="text-center md:text-left">
                <h4 className="text-lg lg:text-3xl md:text-2xl cursor-pointer hover:text-orange-400">
                  {data.tag}
                </h4>
                <p className="text-sm md:text-base lg:text-lg">
                  {data.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link href="/"
          className="inline-flex items-center justify-center px-5 py-3 text-base md:text-lg lg:text-xl font-medium text-center text-white bg-red-500 rounded-lg hover:bg-orange-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 ml-4 mt-8"
        >
          Read More
          <svg
            className="w-5 h-5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>

      {/* Right Section (Image Grid) */}
      <div className="image-container mt-8 md:mt-0 lg:ml-20 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Image
          src="https://demo2.themelexus.com/farmor/wp-content/uploads/2023/09/h1-banner03.svg"
          alt="Banner 3"
          width={500}
          height={500}
          className="hover:scale-110 transition duration-500 cursor-pointer w-full md:w-auto"
        />
        <Image
          src="/images/h1-banner01.jpg"
          alt="Banner 1"
          width={500}
          height={500}
          className="hover:scale-110 transition duration-500 cursor-pointer w-full md:w-auto"
        />
        <Image
          src="/images/h1-banner02.jpg"
          alt="Banner 2"
          width={500}
          height={500}
          className="hover:scale-110 transition duration-500 cursor-pointer w-full md:w-auto"
        />
      </div>
    </section>
  );
};

export default AboutSection;