import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
export const metadata: Metadata = {
  title: "EmpowerVision",
  description: "CV Capabilities for Envision",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-accent flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
