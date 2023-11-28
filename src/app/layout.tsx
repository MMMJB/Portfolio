import "./globals.css";
import type { Metadata } from "next";
import { Azeret_Mono, Public_Sans } from "next/font/google";

import Keyboard from "./components/keyboard";

const PublicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const AzeretMono = Azeret_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          .font-mono {
            font-family: ${AzeretMono.style.fontFamily.replaceAll("'", "")};
          }    
        `}</style>
      </head>
      <body className={`${PublicSans.className} min-h-screen flex flex-col`}>
        <main className="flex-grow flex items-center justify-center">
          {children}
        </main>
        <Keyboard />
      </body>
    </html>
  );
}
