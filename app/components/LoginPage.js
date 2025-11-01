"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ✅ Preload the home route to make redirect after login faster
  useEffect(() => {
    router.prefetch("/home");
  }, [router]);


const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setIsLoading(true);

  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (result?.error) {
    setError("Invalid email or password");
    setIsLoading(false);
  } else {
    setError(null); 
    router.replace("/home"); // ✅ Redirect now
  }
};

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-linear-to-br from-green-100 via-white to-green-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 shadow-lg rounded-2xl px-8 py-10 w-[90%] max-w-md flex flex-col gap-6"
      >
        <div className="rounded-md bg-green-700 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={120}
            height={60}
            priority
            className="object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold text-center text-green-700">
          Admin Login
        </h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className={`flex justify-center items-center gap-2 w-full text-white font-semibold py-3 rounded-md transition duration-200 ${
            isLoading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-800"
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>Loading...</span>
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}


// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       const result = await signIn("credentials", {
//         redirect: false,
//         email,
//         password,
//       });

//       console.log("🔵 SignIn result:", result);

//       if (result.error) {
//         setError("Invalid email or password");
//         setIsLoading(false);
//       } else {
//         console.log("✅ Login successful, redirecting...");
//         router.push("/home");
//       }
//     } catch (err) {
//       console.error("❌ Login failed:", err);
//       setError("Something went wrong. Please try again.");
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className=" w-full flex justify-center items-center min-h-screen bg-linear-to-br from-green-100 via-white to-green-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white border border-gray-200 shadow-lg rounded-2xl px-8 py-10 w-[90%] max-w-md flex flex-col gap-6"
//       >
//         {/* Logo */}
//        <div className="rounded-md bg-green-700 flex justify-center">
//   <Image
//     src="/images/logo.png"
//     alt="Logo"
//     width={120}
//     height={60}
//     priority
//     className="object-contain w-auto h-auto"
//   />
// </div>

//         <h1 className="text-2xl font-bold text-center text-green-700">
//           Admin Login
//         </h1>

//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           required
//         />

//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           required
//         />

//         {error && <p className="text-red-500 text-center text-sm">{error}</p>}

//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`flex justify-center items-center gap-2 w-full text-white font-semibold py-3 rounded-md transition duration-200 ${
//             isLoading
//               ? "bg-green-400 cursor-not-allowed"
//               : "bg-green-600 hover:bg-green-800"
//           }`}
//         >
//           {isLoading ? (
//             <>
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                 ></path>
//               </svg>
//               <span>Loading...</span>
//             </>
//           ) : (
//             "Login"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }
