import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: {
    default: "Crafty - Handmade & Sustainable Marketplace",
    template: "%s | Crafty",
  },
  description:
    "Discover unique, handcrafted goods from artisans worldwide. Shop sustainable ceramics, bamboo, leather, and more.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <Navbar />
        <Toaster position="top-center" />
        {children}
        <ComingSoon />
        <Footer />
      </body>
    </html>
  );
}
