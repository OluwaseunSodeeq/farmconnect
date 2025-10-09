
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignInBtn from "./SignInBtn";

export  function LoginPage({ setAuthentication }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@example.com" && password === "password123") {
      localStorage.setItem("user", JSON.stringify({ email }));
      setAuthentication(true);
      // router.push("/home");
      setTimeout(() => router.push("/home"), 1000);
    } else {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
         
        </form>
         
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-center">

      <p className="pb-5 pt5 text-center italic font-bold
          ">OR</p>
          <SignInBtn/>
    </div>
        </div>
  );
}

// "use client";

// import { useState } from "react";
// // import { useRouter } from "next/navigation";

// export function LoginPage({ setAuthentication }) {
//   // const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Simple dummy login
//     if (email === "admin@example.com" && password === "password123") {
//       localStorage.setItem("user", JSON.stringify({ email }));
//       setAuthentication(true);
//       // router.push("/home");
//     } else {
//       setError("Invalid credentials. Try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
//         <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
