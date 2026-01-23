import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router"; // ✅ useRouter for Page Router

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/"); // redirect to login
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    );
  }

  return children;
}

// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

// export default function ProtectedRoute({ children }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.replace("/");
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <p className="text-gray-600 text-lg font-medium">Loading...</p>
//       </div>
//     );
//   }

//   if (status === "authenticated") {
//     return children;
//   }

//   return null;
// }
