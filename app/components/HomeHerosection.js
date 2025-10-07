"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { sliderData } from "../data";
import "../css-files/Homeherosection.css";

const HomeHeroSection = () => {
  const [current, setCurrent] = useState(0);
  const length = sliderData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [length]);

  if (!Array.isArray(sliderData) || length === 0) return null;

  return (
    <section className="slider">
      {sliderData.map((slide, index) => (
        <div
          className={`slide ${index === current ? "current" : ""}`}
          key={index}
        >
          {index === current && (
            <div className="relative w-full h-screen">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              <div className="content">
                <h1>{slide.title}</h1>
                <p>{slide.text}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default HomeHeroSection;

// // import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"; // uncomment if needed

// const HomeHerosection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slideLength = sliderData.length;
//   const autoScroll = true;
//   const intervalTime = 5000;
//   const slideInterval = useRef(null);

//   // Move to next slide
//   const nextSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev === slideLength - 1 ? 0 : prev + 1));
//   }, [slideLength]);

//   // Move to previous slide (optional)
//   const prevSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev === 0 ? slideLength - 1 : prev - 1));
//   }, [slideLength]);

//   // Start auto scroll
//   const startAutoScroll = useCallback(() => {
//     slideInterval.current = setInterval(nextSlide, intervalTime);
//   }, [nextSlide, intervalTime]);

//   // Reset to first slide on mount
//   useEffect(() => {
//     setCurrentSlide(0);
//   }, []);

//   // Auto slide effect
//   useEffect(() => {
//     if (autoScroll) startAutoScroll();
//     return () => clearInterval(slideInterval.current);
//   }, [autoScroll, startAutoScroll]);

//   return (
//     <section className="hero-section">
//       <div className="slider">
//         {/* Optional navigation buttons
//         <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
//         <AiOutlineArrowRight className="arrow next" onClick={nextSlide} /> 
//         */}

//         {sliderData.map((slide, index) => (
//           <div
//             className={index === currentSlide ? "slide current" : "slide"}
//             key={index}
//           >
//             {index === currentSlide && (
//               <div>
//                 <Image
//                   src={slide.image}
//                   alt={slide.heading}
//                   width={1200}
//                   height={600}
//                   // fill={false}
//                   priority
//                   className="image"
//                 />
//                 <div className="content">
//                   <h2>{slide.heading}</h2>
//                   <p>{slide.desc}</p>
//                   <hr />
//                   <button className="--btn --btn-primary">Get Started</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HomeHerosection;


// "use client";
// import { useState, useEffect, useRef, useCallback } from "react";
// import Image from "next/image";
// import { sliderData } from "../data";
// import "../css-files/Homeherosection.css";

// const HomeHerosection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slideLength = sliderData.length;
//   const autoScroll = true;
//   const intervalTime = 5000;
//   const slideInterval = useRef(null);

//   // ✅ useCallback ensures stable function reference across renders
//   const nextSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev === slideLength - 1 ? 0 : prev + 1));
//   }, [slideLength]);

//   // Reset slide index on mount
//   useEffect(() => {
//     setCurrentSlide(0);
//   }, []);

//   // ✅ Now effect dependencies are stable
//   useEffect(() => {
//     if (autoScroll) {
//       slideInterval.current = setInterval(nextSlide, intervalTime);
//     }

//     return () => clearInterval(slideInterval.current);
//   }, [autoScroll, nextSlide, intervalTime]);

//   return (
//     <section>
//       <div className="slider">
//         {sliderData.map((slide, index) => (
//           <div
//             className={index === currentSlide ? "slide current" : "slide"}
//             key={index}
//           >
//             {index === currentSlide && (
//               <div>
//                 <Image
//                   src={slide.image}
//                   alt={slide.heading}
//                   width={1200}
//                   height={600}
//                   className="image"
//                 />
//                 <div className="content">
//                   <h2>{slide.heading}</h2>
//                   <p>{slide.desc}</p>
//                   <hr />
//                   <button className="--btn --btn-primary">Get Started</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HomeHerosection;


// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// // import { sliderData } from './NHeroSectionData';
// import { sliderData } from '../data';

// import styles from '../css-files/homeHerSectionStyles.css';

// const HomeHeroSection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slideLength = sliderData.length;

//   const autoScroll = true;
//   const intervalTime = 5000;
//   const slideInterval = useRef(null);

//   const nextSlide = () => {
//     setCurrentSlide((prev) =>
//       prev === slideLength - 1 ? 0 : prev + 1
//     );
//   };

//   useEffect(() => {
//     setCurrentSlide(0);
//   }, []);

//   useEffect(() => {
//     if (autoScroll) {
//       slideInterval.current = setInterval(nextSlide, intervalTime);
//     }
//     return () => {
//       if (slideInterval.current) clearInterval(slideInterval.current);
//     };
//   }, [autoScroll]);

//   return (
//     <section>
//       <div className={styles.slider}>
//         {sliderData.map((slide, index) => (
//           <div
//             className={
//               index === currentSlide
//                 ? `${styles.slide} ${styles.current}`
//                 : styles.slide
//             }
//             key={index}
//           >
//             {index === currentSlide && (
//               <div>
//                 <Image
//                   src={slide.image}
//                   alt="slide"
//                   className={styles.image}
//                   width={1200}
//                   height={600}
//                 />
//                 <div className={styles.content}>
//                   <h2>{slide.heading}</h2>
//                   <p>{slide.desc}</p>
//                   <hr />
//                   <button className="--btn --btn-primary">Get Started</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HomeHeroSection;
