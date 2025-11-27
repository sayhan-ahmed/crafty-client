import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Crafty",
  description: "Handmade products",
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
