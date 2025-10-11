"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { HashLoader } from "react-spinners";

function Parent({ children }) {
  return <div>{children}</div>;
}

export default function RootComponent({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  // 🌀 Loading spinner while checking session
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-green-400">
        <HashLoader className="text-gray-700" size={80} />
      </div>
    );
  }

  // 🧭 If on login page, don't show navbar/footer
  if (pathname === "/login") {
    return <>{children}</>;
  }

  // 🔒 Redirect unauthenticated users to login
  if (!session?.user) {
    router.replace("/login");
    return null;
  }

  // ✅ Authenticated users see everything
  return (
    <section className="w-full">
      <Navbar />
      <Parent>{children}</Parent>
      <Footer />
    </section>
  );
}


// "use client";

// import { useSession } from "next-auth/react";
// import { usePathname } from "next/navigation";
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import Page from "../login/page";

// function Parent({ children }) {
//   return <div>{children}</div>;
// }

// export default function RootComponent({ children }) {
//   const { data: session, status } = useSession();
//   const pathname = usePathname();

//   if (status === "loading") {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   // ✅ Allow login page to render freely
//   if (pathname === "/login") {
//     return <Page />;
//   }

//   // 🔒 Protect other routes
//   if (!session?.user) {
//     return <Page />;
//   }

//   return (
//     <section className="w-full">
//       <Navbar />
//       <Parent>{children}</Parent>
//       <Footer />
//     </section>
//   );
// }



// "use client";

// import React, { useState } from "react";
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import Page from "../login/page";

// function Parent({ children }) {
//   return <div>{children}</div>;
// }

// export default function RootComponent({ children }) {
//   const [authentication, setAuthentication] = useState(false);

//   return (
//     <section className="w-full">
//       {authentication ? (
//         <>
//           <Navbar />
//           <Parent>{children}</Parent>
//           <Footer />
//         </>
//       ) : (
//         <Page setAuthentication={setAuthentication} />
//       )}
//     </section>
//   );
// }
