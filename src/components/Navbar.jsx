"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Plus,
  Package,
  ShoppingBag,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import { Cormorant } from "next/font/google";
import toast from "react-hot-toast";

const cormorant = Cormorant({ subsets: ["latin"] });

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. NEW STATE: For the Custom Logout Modal
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path) => pathname === path;
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.emailVerified) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    const loadingId = toast.loading("Logging out...");

    setTimeout(async () => {
      try {
        await signOut(auth);
        toast.success("Successfully logged out", { id: loadingId });
        router.push("/");
      } catch (error) {
        console.error("Logout Error:", error);
        toast.error("Failed to log out", { id: loadingId });
      }
    }, 1500);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <div className="bg-[#507662] text-white text-center text-sm md:text-base font-medium py-3">
        <span className={cormorant.className}>
          Handmade with love. Delivered with care.
        </span>
      </div>
      <nav
        className={`${cormorant.className} sticky top-0 z-50 bg-white border-b border-gray-100`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-1">
              <span className="text-4xl md:text-5xl font-bold tracking-tighter">
                crafty.
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xl font-medium relative transition-colors ${
                    isActive(link.href)
                      ? "text-amber-700 font-bold"
                      : "text-gray-700 hover:text-amber-700"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-0.5 bg-amber-700 transition-all duration-300 ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  {/* ---- USER DROPDOWN ---- */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center space-x-2 text-xl font-bold text-[#507662] hover:text-amber-700 transition-colors"
                    >
                      <div className="w-9 h-9 bg-[#507662]/10 rounded-full flex items-center justify-center">
                        {user.photoURL ? (
                          <Image
                            src={user.photoURL}
                            alt={user.displayName || "User Avatar"}
                            width={36}
                            height={36}
                            unoptimized={true}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-6 h-6 text-[#507662]" />
                        )}
                      </div>
                      <span className="max-w-28 truncate">
                        {user.displayName || user.email}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-xl font-bold text-gray-900">
                            {user.displayName}
                          </p>
                          <p className="text-base text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>

                        <Link
                          href="/dashboard/add"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-base font-bold text-gray-700 hover:bg-[#507662]/10"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Product</span>
                        </Link>

                        <Link
                          href="/dashboard/orders"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-base font-bold text-gray-700 hover:bg-[#507662]/10"
                        >
                          <Package className="w-4 h-4" />
                          <span>Manage Products</span>
                        </Link>

                        {/* UPDATED LOGOUT BUTTON */}
                        <button
                          onClick={handleLogoutClick}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-base font-semibold text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Cart Icon */}
                  <Link
                    href="/dashboard/orders"
                    className="relative p-2 text-gray-700 hover:text-amber-700 transition-colors"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-xl font-bold text-[#507662] hover:text-amber-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-xl font-medium text-white px-4 py-1.5 rounded-full bg-amber-700 hover:bg-amber-800 transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5 animate-float"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Routes */}
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-amber-700 font-semibold bg-amber-50"
                        : "text-gray-700 hover:bg-amber-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Logged Out */}
                {!user ? (
                  <>
                    <Link
                      href="/login"
                      className="block px-3 py-2 text-base font-semibold text-[#507662] hover:bg-amber-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block px-3 py-2 text-base font-semibold text-[#507662] hover:bg-amber-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Orders */}
                    <Link
                      href="/dashboard/orders"
                      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-amber-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>My Orders</span>
                    </Link>

                    {/* Add Product */}
                    <Link
                      href="/dashboard/add"
                      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Product</span>
                    </Link>

                    {/* Manage Products */}
                    <Link
                      href="/dashboard/orders"
                      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Package className="w-4 h-4" />
                      <span>Manage Products</span>
                    </Link>

                    {/* User + Logout Row */}
                    <div className="flex items-center justify-between p-2">
                      {/* User Info */}
                      <div className="flex items-center space-x-2">
                        <div className="w-9 h-9 bg-[#507662]/10 rounded-full flex items-center justify-center">
                          {user.photoURL ? (
                            <Image
                              src={user.photoURL}
                              alt={user.displayName}
                              width={36}
                              height={36}
                              unoptimized={true}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 text-[#507662]" />
                          )}
                        </div>
                        <span className="text-xl font-semibold text-[#507662] truncate max-w-32">
                          {user.displayName || user.email}
                        </span>
                      </div>

                      {/* Logout Button */}
                      <button
                        onClick={handleLogoutClick}
                        className="flex items-center space-x-1 text-base font-medium bg-[#507662]/80 text-white px-3 py-1.5 rounded-md cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 3. CUSTOM LOGOUT MODAL UI */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3
                className={`${cormorant.className} text-2xl font-bold text-gray-900 mb-2`}
              >
                Sign Out?
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to log out of your account?
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
