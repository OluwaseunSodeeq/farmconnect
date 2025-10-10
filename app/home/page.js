'use client';

import React, { useState, useEffect } from 'react';
import { HashLoader } from 'react-spinners';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import HomeHeroSection from '../Components/HomeHerosection';
import About from '../Components/About';
import Testimonial from '../Components/Testimonial';
import Service from '../Components/Service';
import Team from '../Components/Team';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Fake loader
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  // 🔒 Protect this route: only admins can access
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/'); // redirect to login if not logged in
    } else if (session && session.user?.role !== 'admin') {
      router.push('/'); // redirect if not an admin
    }
  }, [status, session, router]);

  // Show loader while session or data is loading
  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-400">
        <HashLoader className="text-gray-700" size={80} />
      </div>
    );
  }

  return (
    <>
      <HomeHeroSection />
      <About />
      <Testimonial />
      <Service />
      <Team />
    </>
  );
}


// 'use client';
// import React, { useState, useEffect } from 'react';
// import { HashLoader } from 'react-spinners';
// import { usePathname } from 'next/navigation';

// import HomeHeroSection from '../Components/HomeHerosection';
// import About from '../Components/About';
// import Testimonial from '../Components/Testimonial';
// import Service from '../Components/Service';
// import Team from '../Components/Team';

// const Page = () => {
//   const [loading, setLoading] = useState(true);
//   const pathname = usePathname();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   useEffect(() => {
//     const fetchData = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 3000));
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <div className="flex justify-center items-center h-screen bg-green-400">
//           <HashLoader className="text-gray-700" size={80} />
//         </div>
//       ) : (
//         <>
//           <HomeHeroSection />
//           <About />
//           <Testimonial />
//           <Service />
//           <Team />
//         </>
//       )}
//     </div>
//   );
// };

// export default Page;



// 'use client';

// import React, { useState, useEffect } from 'react';
// import { HashLoader } from 'react-spinners';
// import { useRouter } from 'next/navigation';
// import { usePathname } from 'next/navigation';

// import HomeHeroSection from '../components/HomeHerosection';
// import About from '../components/About';
// import Testimonial from '../components/Testimonial';
// import Service from '../components/Service';
// import Team from '../components/Team';

// const Home = () => {
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   useEffect(() => {
//     const fetchData = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 3000));
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       router.push('/'); // Navigate to the home page
//     }
//   }, [loading, router]);

//   return (
//     <div>
//       {loading ? (
//         <div className="flex justify-center items-center h-screen bg-green-400">
//           <HashLoader className="text-gray-700" size={80} />
//         </div>
//       ) : (
//         <>
//           <HomeHeroSection />
//           <About />
//           <Testimonial />
//           <Service />
//           <Team />
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;



// // import React, { useState, useEffect } from "react";
// // import { useRouter } from "next/router";
// // import { usePathname } from "next/navigation";
// // import { HashLoader } from "react-spinners";
// // import About from "../About/About";
// // import Service from "../Services/Service";
// // import NHerosection from "../NHeroSection/NHerosection";
// // import Testimonial from "../Testimonial/Testimonial";
// // import Team from "../TeamMambers/OurTeam";
// // import "./home.css";

// // const Home = () => {
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   const { pathname } = useLocation();

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, [pathname]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       await new Promise((resolve) => setTimeout(resolve, 3000));
// //       setLoading(false);
// //     };

// //     fetchData();
// //   }, []);

// //   useEffect(() => {
// //     if (!loading) {
// //       // Use useNavigate to navigate after loading
// //       navigate("/"); // or any other route you want to navigate to
// //     }
// //   }, [loading, navigate]);

// //   return (
// //     <div>
// //       {loading ? (
// //         <div className="flex justify-center items-center h-screen bg-green-400">
// //           <HashLoader className="text-gray-700" size={80} />
// //         </div>
// //       ) : (
// //         <>
// //           <NHerosection />
// //           <About />
// //           <Testimonial />
// //           <Service />
// //           <Team />
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Home;
