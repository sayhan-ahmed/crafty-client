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
  Upload,
  Loader2,
} from "lucide-react";
import { Cormorant } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
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

  // Image State
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  // 1. Handle File Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 2. Upload to ImgBB
  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    // Get key
    const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.data.url;
  };

  // Sync user to MongoDB
  const saveUserToBackend = async (user, photoURL) => {
    try {
      await fetch("https://crafty-server.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          user: user.displayName || name,
          image: photoURL || user.photoURL || "",
        }),
      });
    } catch (error) {
      console.error("Backend sync failed:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Name and Password Validation
    if (name.length < 5) {
      return toast.error("Please enter your full name");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const loadingId = toast.loading("Creating account...");
    setUploading(true);

    try {
      let photoURL = "";
      if (imageFile) {
        toast.loading("Creating your account...", {
          id: loadingId,
        });
        photoURL = await uploadToImgBB(imageFile);
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name, photoURL: photoURL });

      // 3. SEND VERIFICATION EMAIL
      await sendEmailVerification(user);

      await signOut(auth);

      toast.success(
        "Verification email sent! Please check your inbox and spam as well.",
        { id: loadingId, duration: 6000 }
      );
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.message, { id: loadingId });
    } finally {
      setUploading(false);
    }
  };

  // Google Login Logic
  const handleGoogleRegister = async () => {
    const loadingId = toast.loading("Connecting...");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await saveUserToBackend(result.user);
      toast.success("Account created!", { id: loadingId });
      router.push("/");
    } catch (err) {
      toast.error("Google Sign-in failed", { id: loadingId });
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
            Join our community.
          </p>
        </div>

        <div className="p-8">
          {/* Google Button */}
          <button
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 text-lg font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 mb-6"
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
            {/* Image Upload Input */}
            <div className="flex justify-center mb-4">
              <div className="relative group cursor-pointer w-24 h-24">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="w-full h-full rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden group-hover:border-[#507662] transition-colors">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <Upload className="w-6 h-6 mx-auto" />
                      <span className="text-xs">Photo</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] outline-none"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] outline-none"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] outline-none"
              />
              {/* Eye toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#507662] cursor-pointer transition-all ease-in-out duration-300"
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
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <CheckCircle className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] outline-none"
              />
              {/* Eye toggle button */}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#507662] cursor-pointer transition-all ease-in-out duration-300"
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
              disabled={uploading}
              className="w-full bg-[#507662] text-white py-3 rounded-lg font-bold text-xl hover:bg-[#3d5a4b] hover:scale-105 transition-all ease-in-out duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {uploading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
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
