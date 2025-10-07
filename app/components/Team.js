"use client";
import { useState } from "react";
import Image from "next/image";
import { FaFacebook, FaEnvelope, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const teamData = [
  {
    name: "Omkar Jaypuria",
    role: "Agriculture Engineer",
    email: "agriculture@gmail.com",
    imageSrc: "/images/team2.jpg",
  },
  {
    name: "Gadadhar Martha",
    role: "Agriculture Engineer",
    email: "agriculture@gmail.com",
    imageSrc: "/images/team3.jpg",
  },
  {
    name: "Shalini Patel",
    role: "Architect",
    email: "agriculture@gmail.com",
    imageSrc: "/images/team1.jpg",
  },
  {
    name: "Amitkumar Patel",
    role: "Agriculture cum Founder",
    email: "agriculture@gmail.com",
    imageSrc: "/images/team2.jpg",
  },
];

export default function Team() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseOver = (index) => setActiveIndex(index);

  return (
    <section className="bg-white py-24">
      <div className="px-8 xl:px-5 min-h-screen grid place-content-center sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
        <h1 className="capitalize text-center mb-10 sm:col-span-2 lg:col-span-4 text-4xl sm:text-5xl xl:text-4xl font-extrabold text-orange-500">
          Meet Our Team
        </h1>

        {teamData.map((team, index) => (
          <div
            key={index}
            onMouseOver={() => handleMouseOver(index)}
            className={`group bg-white shadow-lg border-b-4 border-transparent transition-all duration-300 cursor-pointer hover:border-green-800 ${
              activeIndex === index ? "border-green-800" : ""
            }`}
          >
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <Image
                src={team.imageSrc}
                alt={team.name}
                width={100}
                height={100}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-green-600 bg-opacity-0 group-hover:bg-opacity-70 flex justify-center items-center transition-all duration-300">
                <ul className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[FaFacebook, FaEnvelope, FaLinkedin, FaTwitter].map(
                    (Icon, i) => (
                      <li
                        key={i}
                        className="w-11 h-11 bg-gray-700 hover:bg-gray-600 flex items-center justify-center rounded-full"
                      >
                        <a href="#">
                          <Icon className="text-white text-xl" />
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Text Section */}
            <div className="pt-5 pb-7 px-5 text-center">
              <h2 className="text-xl font-semibold">{team.name}</h2>
              <span className="text-gray-500 capitalize block mt-1 mb-3">
                {team.role}
              </span>
              <p className="text-gray-500">
                Email:{" "}
                <Link
                  href={`mailto:${team.email}`}
                  className="font-medium hover:text-gray-800"
                >
                  {team.email}
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
