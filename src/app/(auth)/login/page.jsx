"use client";

import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Cormorant } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const cormorant = Cormorant({ subsets: ["latin"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Sync user to MongoDB backend
  const saveUserToBackend = async (user) => {
    try {
      await fetch("https://crafty-server.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          user: user.displayName || user.email.split("@")[0],
          image: user.photoURL || "",
        }),
      });
    } catch (error) {
      console.error("Backend sync failed:", error);
    }
  };

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const loadingId = toast.loading("Logging in...");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 1. CHECK EMAIL VERIFICATION
      if (!user.emailVerified) {
        toast.error("Please verify your email address first!", {
          id: loadingId,
        });
        await signOut(auth);
        return;
      }

      // 2. Only save to DB if verified
      await saveUserToBackend(user);

      toast.success("Welcome back!", { id: loadingId });
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password", { id: loadingId });
    }
  };

  // Handle Google Login (Auto Verified)
  const handleGoogleLogin = async () => {
    const loadingId = toast.loading("Connecting with Google...");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await saveUserToBackend(user);

      toast.success("Logged in with Google!", { id: loadingId });
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message, { id: loadingId });
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      return toast.error("Please enter your email address first");
    }
    const loadingId = toast.loading("Sending reset email...");
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!", { id: loadingId });
    } catch (err) {
      toast.error("Failed to send reset email. Check if email is valid.", {
        id: loadingId,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcf8f0] px-4 py-12">
      <div
        className={`${cormorant.className} max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden`}
      >
        {/* Header Section */}
        <div className="bg-[#507662] p-8 text-center">
          <Link
            href="/"
            className="text-5xl font-bold text-white tracking-tight"
          >
            crafty.
          </Link>
          <p className="text-white/80 mt-2 text-lg font-medium">
            Welcome back! Please login to continue.
          </p>
        </div>

        <div className="p-8">
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 text-lg font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm mb-6"
          >
            <FcGoogle className="w-6 h-6" />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-gray-500">
                Or login with email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Password Field with Eye Toggle */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] focus:border-transparent outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-medium text-amber-700 hover:text-amber-800 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#507662] text-white py-3 rounded-lg font-bold text-xl hover:bg-[#3d5a4b] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>Login</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Register Link */}
          <p className="text-lg text-center mt-8 text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-amber-700 font-bold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
