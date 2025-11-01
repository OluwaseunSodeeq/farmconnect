import "./globals.css";
import { Montserrat } from "next/font/google";
import ClientLayout from "./components/ClientLayout";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Farm Connect",
  description: "Farmers friend application",
  icon:"/images/logo.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body className="h-auto bg-main-bg relative">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}




// import "./globals.css";
// import { Montserrat } from "next/font/google";
// import RootComponent from "./Components/RootComponent";
// import { OpenContextProvider } from "./contexts/OpenContext";
// import Providers from "./providers";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   variable: "--font-montserrat",
// });

// export const metadata = {
//   title: "Farm Connect",
//   description: "Farmers friend application",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className={`${montserrat.variable}`}>
//       <body className="h-auto bg-main-bg relative">
//         <OpenContextProvider>
//           <Providers>
//             <main>
//               <RootComponent>{children}</RootComponent>
//             </main>
//           </Providers>
//         </OpenContextProvider>
//       </body>
//     </html>
//   );
// }
