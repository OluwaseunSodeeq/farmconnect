"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { HashLoader } from 'react-spinners';
import HomeHerosection from "../components/HomeHerosection";
import About from "../components/About";
import Testimonial from "../components/Testimonial";
import Service from "../components/Service";
import Team from "../components/Team";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log(status)
      router.push("/login");
    }
  }, [status, router]);

   // Show loader while session or data is loading
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen bg-green-400">
        <HashLoader className="text-gray-700" size={80} />
      </div>
    );
  }
  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }

  return (
    <>
      <HomeHerosection />
      <About />
      <Testimonial />
      <Service />
      <Team/>
    </>
  );
}
