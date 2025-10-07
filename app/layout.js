import "./globals.css";
import { Montserrat } from "next/font/google";
import RootComponent from "./components/RootComponent";
import { OpenContextProvider } from "./contexts/OpenContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Farm Connect",
  description: "Farmers friend application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body className="h-auto bg-main-bg relative">
        <OpenContextProvider>
          <RootComponent>{children}</RootComponent>
        </OpenContextProvider>
      </body>
    </html>
  );
}
