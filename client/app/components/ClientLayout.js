"use client";

import { SessionProvider } from "next-auth/react";

export default function ClientLayout({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}


// "use client";

// import React from "react";
// import { SessionProvider } from "next-auth/react";
// import { OpenContextProvider } from "../contexts/OpenContext";
// import RootComponent from "./RootComponent";

// export default function ClientLayout({ children }) {
//   return (
//     <OpenContextProvider>
//         <SessionProvider>
//         <main>
//           <RootComponent>{children}</RootComponent>
//         </main>
//     </SessionProvider>
//       </OpenContextProvider>
//   );
// }
