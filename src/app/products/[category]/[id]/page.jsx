"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShoppingBag,
  Calendar,
  Tag,
  Star,
  CheckCircle,
} from "lucide-react";
import { Cormorant } from "next/font/google";
import { toast } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const cormorant = Cormorant({ subsets: ["latin"] });

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Product Data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://crafty-server.vercel.app/products/${id}`
        );
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Product not found");
        router.push("/products");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, router]);

  // Handle Place Order
  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Please login to place an order");
      router.push("/login");
      return;
    }

    const toastId = toast.loading("Processing order...");

    try {
      const { _id, ...productData } = product;
      const orderData = {
        ...productData,
        productId: _id,
        email: user.email,
        userEmail: user.email,
      };

      // Send to Backend
      const res = await fetch("https://crafty-server.vercel.app/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        toast.success("Order placed successfully!", { id: toastId });
        router.push("/dashboard/orders");
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to order", { id: toastId });
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcf8f0] flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
          <p className="text-gray-500 font-medium">Loading details...</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#fcf8f0] py-12 px-4 sm:px-6 lg:px-8">
      <div className={`${cormorant.className} max-w-7xl mx-auto`}>
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center text-gray-600 hover:text-[#507662] mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Collection
        </Link>

        {/* Main Content Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT: Large Image */}
            <div className="relative h-[400px] lg:h-auto bg-gray-100">
              <Image
                src={product.image || "/images/placeholder.jpg"}
                alt={product.name}
                fill
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-700"
                unoptimized={true}
              />
              {/* Category Tag Overlay */}
              <div className="absolute top-6 left-6">
                <span className="bg-white/90 backdrop-blur-md text-[#507662] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>

            {/* RIGHT: Product Details */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              {/* Date & Rating */}
              <div className="flex items-center space-x-4 text-base text-gray-500 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>
                    Listed{" "}
                    {new Date(
                      product.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center text-amber-500 text-xl font-bold">
                  <Star className="w-4 h-4 mr-1.5 fill-current" />
                  <span className="-mt-2">{product.rating || 5.0} / 5.0</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-[#3f3f3f] mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex text-3xl font-bold text-[#507662] mb-6">
                <span className="mt-1 mr-1">$</span>
                <span>{product.price}</span>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gray-100 mb-4"></div>

              {/* Description */}
              <div className="prose prose-stone max-w-none mb-10">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description ||
                    "This handcrafted item is made with sustainable materials and careful attention to detail. Perfect for adding a touch of natural elegance to your home."}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-[#c76536] mr-3" />
                  <span>Ethically Sourced</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-[#c76536] mr-3" />
                  <span>Handmade Quality</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto">
                <button
                  onClick={handlePlaceOrder}
                  className="w-full flex items-center justify-center space-x-2 bg-[#507662] hover:bg-[#3d5a4b] text-white py-4 px-8 rounded-lg font-bold text-lg transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1"
                >
                  <ShoppingBag className="w-6 h-6" />
                  <span>Place Order Now</span>
                </button>
                <p className="text-center text-base text-gray-400 mt-4">
                  Secure checkout • Free shipping on orders over $100
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
