"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag, Eye, Star } from "lucide-react";
import { Cormorant } from "next/font/google";
import { toast } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
const cormorant = Cormorant({ subsets: ["latin"] });

export default function FeaturedCollection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check Login Status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Data from Backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://crafty-server.vercel.app/products");
        const data = await res.json();
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Could not load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle Add to Orders (Cart)
  const handleAddToOrder = async (product) => {
    if (!user) {
      toast.error("Please login to place an order");
      router.push("/login");
      return;
    }
    const toastId = toast.loading("Adding to orders...");

    try {
      const { _id, ...productData } = product;
      const orderData = {
        ...productData,
        productId: _id,
        email: user.email,
        userEmail: user.email,
      };

      // Call Backend API
      const res = await fetch("https://crafty-server.vercel.app/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        toast.success("Successfully added to Orders!", { id: toastId });
      } else {
        toast.error("Failed to add order.", { id: toastId });
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Something went wrong.", { id: toastId });
    }
  };

  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-white flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 w-64 bg-gray-200 rounded"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-gray-100/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-amber-700 font-bold tracking-widest uppercase text-sm">
            Handpicked Favorites
          </span>
          <h2
            className={`${cormorant.className} text-4xl md:text-5xl font-bold text-[#3f3f3f] mt-3 mb-6`}
          >
            Trending This Season
          </h2>
          <div className="w-24 h-1 bg-[#507662] mx-auto opacity-80"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="group relative">
              {/* Image Container */}
              <div className="relative aspect-3/4 overflow-hidden rounded-sm bg-gray-100 mb-4">
                <Image
                  src={product.image || "/images/placeholder.jpg"}
                  alt={product.name || "Craft Item"}
                  fill
                  objectFit="cover"
                  className="transition-transform duration-700 group-hover:scale-110"
                  unoptimized={true}
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  {/* Eye Button: Go to Details */}
                  <Link
                    href={`/products/${product.category}/${product._id}`}
                    className="p-3 bg-white text-[#3f3f3f] rounded-full hover:bg-amber-700 hover:text-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>

                  {/* Cart Button: Add to Orders */}
                  <button
                    onClick={() => handleAddToOrder(product)}
                    className="p-3 bg-white text-[#3f3f3f] rounded-full hover:bg-[#507662] hover:text-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 cursor-pointer"
                    title="Add to Orders"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>

                {/* Badges */}
                {(product.rating || 5) >= 4.8 && (
                  <div className="absolute top-3 left-3 bg-[#c76536] text-white text-xs font-bold px-2 py-1 uppercase tracking-wide">
                    Best Seller
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                  {product.category || "General"}
                </p>
                <h3
                  className={`${cormorant.className} text-xl font-bold text-gray-800 group-hover:text-amber-700 transition-colors cursor-pointer truncate px-2`}
                >
                  <Link href={`/products/${product._id}`}>
                    {product.name || "Untitled Product"}
                  </Link>
                </h3>

                {/* Rating & Price */}
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <span className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating || 5)
                            ? "fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </span>
                  <span className="text-gray-900 font-semibold">
                    ${product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            href="/products"
            className="inline-block border-b-2 border-[#3f3f3f] pb-1 text-lg font-medium text-[#3f3f3f] hover:text-amber-700 hover:border-amber-700 transition-colors"
          >
            View Entire Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
