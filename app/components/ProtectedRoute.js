// "use client";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { HashLoader } from "react-spinners";

// export default function ProtectedRoute({ children }) {
//   const { status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login");
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return (
//       <div className="flex justify-center items-center h-screen bg-green-400">
//         <HashLoader className="text-gray-700" size={80} />
//       </div>
//     );
//   }

//   return children;
// }
