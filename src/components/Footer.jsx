"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  CreditCard,
  ChevronUp,
} from "lucide-react";
import { FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";
import { Cormorant } from "next/font/google";
import toast from "react-hot-toast";

const cormorant = Cormorant({ subsets: ["latin"] });

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const sellerLinks = [
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Special Offers", href: "#" },
    { name: "FAQs", href: "#" },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return toast.error("Invalid email address");
    }
    const loadingToast = toast.loading("Subscribing...");
    setSubmitting(true);
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success("Thanks — you’re subscribed!");
      setSubmitting(false);
      setEmail("");
    }, 900);
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      className={`${cormorant.className} bg-linear-to-b from-[#3f6a55] to-[#2f5a45] text-white`}
    >
      {/* Top decorative band */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="rounded-xl bg-white/6 p-8 md:p-10 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Logo and Socials */}
            <div className="space-y-4">
              <Link href="/" className="inline-block no-underline">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                  crafty.
                </h2>
              </Link>

              <p className="text-base md:text-lg text-white/85 max-w-xs">
                Handmade treasures, delivered with love. Every piece tells a
                story — curated from small-batch artisans.
              </p>
              {/* Socials */}
              <div className="flex items-center gap-3 mt-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="social-icon animate-float"
                >
                  <FaInstagram className="w-6 h-6" strokeWidth={1.5} />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="social-icon animate-float"
                >
                  <FaFacebookF className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="social-icon animate-float"
                >
                  <FaXTwitter className="w-5 h-5" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Explore links */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 ">
                Explore
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="footer-link">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 ">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {sellerLinks.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="footer-link">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + newsletter */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-2 ">Get in Touch</h3>

              <div className="space-y-2 text-sm md:text-base text-white/85">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" strokeWidth={1.5} />
                  <span>hello@crafty.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                  <span>+880 (123) 456-7890</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" strokeWidth={1.5} />
                  <span>Dhaka, Bangladesh</span>
                </p>
              </div>

              <div className="pt-3">
                <p className="text-sm text-white/75 mb-2">
                  Join our newsletter
                </p>
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="flex-1 px-3 py-2 rounded-md border border-white/20 bg-white/5 placeholder-white/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-md bg-amber-700 hover:bg-amber-800 text-white font-semibold text-base disabled:opacity-60 transition-all duration-300 ease-in-out hover:scale-105"
                  >
                    {submitting ? "Sending..." : "Subscribe"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Trust badges & CTA row */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/8 pt-6">
            <div className="flex items-center gap-4 text-sm text-white/80">
              <span className={cormorant.className}>
                Copyright © {currentYear} | All Rights Reserved
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 items-center gap-3 font-semibold">
                <div className="flex items-center gap-2 bg-white/6 px-3 py-2 rounded-md">
                  <CreditCard className="w-5 h-5" strokeWidth={1.5} />
                  <span className="text-sm text-white/85">Secure payments</span>
                </div>
                <div className="flex items-center gap-2 bg-white/6 px-3 py-2 rounded-md">
                  <LiaShippingFastSolid className="w-5 h-5" />
                  <span className="text-sm text-white/85">Fast shipping</span>
                </div>
              </div>
              <button
                onClick={scrollToTop}
                className="hidden sm:block p-2 rounded-md bg-white/6 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-amber-600"
                aria-label="Back to top"
              >
                <ChevronUp className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Small bottom bar */}
      <div className="mt-6 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-white/70">
          <div>Crafted with quality • Fair shipping policies</div>
          <div>Secure checkout • Easy returns</div>
        </div>
      </div>
    </footer>
  );
}
