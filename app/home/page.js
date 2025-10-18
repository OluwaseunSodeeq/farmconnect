"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";

import Navbar from "../components/Navbar";
import HomeHerosection from "../components/HomeHerosection";
import AboutSection from "../components/AboutSection";
import Testimonial from "../components/Testimonial";
import Service from "../components/Service";
import Team from "../components/Team";
import Footer from "../components/Footer";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 🚀 Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login"); // use replace() to prevent going back
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-green-400">
        <HashLoader color="#ffffff" size={80} />
      </div>
    );
  }

  // ✅ Show home page content only when authenticated
  if (status === "authenticated") {
    return (
      <section>
        <Navbar />
        <HomeHerosection />
        <AboutSection />
        <Testimonial />
        <Service />
        <Team />
        <Footer />
      </section>
    );
  }

  return null;
}


