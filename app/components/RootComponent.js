// "use client";

// import { useSession } from "next-auth/react";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { HashLoader } from "react-spinners";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// function Parent({ children }) {
//   return <div>{children}</div>;
// }

// export default function RootComponent({ children }) {
//   const { data: session, status } = useSession();
//   const pathname = usePathname();
//   const router = useRouter();

//   // Wait for hydration before redirect
//   useEffect(() => {
//     if (status === "unauthenticated" && pathname !== "/login") {
//       router.replace("/login");
//     }
//   }, [status, pathname, router]);

//   // Show loading while session status is being determined
//   if (status === "loading") {
//     return (
//       <div className="flex justify-center items-center h-screen bg-green-400">
//         <HashLoader className="text-gray-700" size={80} />
//       </div>
//     );
//   }

//   // On login page, don’t show navbar/footer
//   if (pathname === "/login") {
//     return <>{children}</>;
//   }

//   // Prevent flash of unauthenticated state before redirect
//   if (status === "unauthenticated") {
//     return null;
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

// import { useSession } from "next-auth/react";
// import { usePathname, useRouter } from "next/navigation";

// import { HashLoader } from "react-spinners";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// function Parent({ children }) {
//   return <div>{children}</div>;
// }

// export default function RootComponent({ children }) {
//   const { data: session, status } = useSession();
//   const pathname = usePathname();
//   const router = useRouter();

//   // Loading spinner while checking session
//   if (status === "loading") {
//     return (
//       <div className="flex justify-center items-center h-screen bg-green-400">
//         <HashLoader className="text-gray-700" size={80} />
//       </div>
//     );
//   }

//   // 🧭 If on login page, don't show navbar/footer
//   if (pathname === "/login") {
//     return <>{children}</>;
//   }

//   // 🔒 Redirect unauthenticated users to login
//   if (!session?.user) {
//     router.replace("/login");
//     return null;
//   }

//   // ✅ Authenticated users see everything
//   return (
//     <section className="w-full">
//       <Navbar />
//       <Parent>{children}</Parent>
//       <Footer />
//     </section>
//   );
// }

