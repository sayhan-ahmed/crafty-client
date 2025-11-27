"use client";

import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  CheckCircle,
} from "lucide-react";
import { Cormorant } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const cormorant = Cormorant({ subsets: ["latin"] });

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  // Sync user to MongoDB (For Google Login only)
  const saveUserToBackend = async (user) => {
    try {
      await fetch("https://crafty-server.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          user: user.displayName || name || user.email.split("@")[0],
          image: user.photoURL || "",
        }),
      });
    } catch (error) {
      console.error("Backend sync failed:", error);
    }
  };

  // Handle Google Register (Google emails are Auto-Verified)
  const handleGoogleRegister = async () => {
    const loadingId = toast.loading("Connecting with Google...");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save directly because Google verifies emails
      await saveUserToBackend(user);

      toast.success("Account created with Google!", { id: loadingId });
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message, { id: loadingId });
    }
  };

  // Handle Email/Password Register
  const handleRegister = async (e) => {
    e.preventDefault();

    // Password Validation
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const loadingId = toast.loading("Creating account...");

    try {
      // 1. Create User in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 2. Update Profile
      await updateProfile(user, {
        displayName: name,
      });

      // 3. SEND VERIFICATION EMAIL
      await sendEmailVerification(user);

      // 4. Sign Out Immediately without verification
      await signOut(auth);

      toast.success(
        "Verification email sent! Please check your inbox and spam as well.",
        { id: loadingId, duration: 6000 }
      );
      router.push("/login");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        toast.error("Email is already registered", { id: loadingId });
      } else {
        toast.error(err.message, { id: loadingId });
      }
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
            Join our community of artisans.
          </p>
        </div>

        <div className="p-8">
          {/* Google Button */}
          <button
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 text-lg font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm mb-6"
          >
            <FcGoogle className="w-6 h-6" />
            <span>Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-gray-500">
                Or register with email
              </span>
            </div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] focus:border-transparent outline-none transition-all"
              />
            </div>

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

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
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

            {/* Confirm Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CheckCircle className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] focus:border-transparent outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#507662] text-white py-3 rounded-lg font-bold text-xl hover:bg-[#3d5a4b] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-lg text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-amber-700 font-bold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
