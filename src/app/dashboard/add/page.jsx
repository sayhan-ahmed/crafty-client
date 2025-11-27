"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Upload, Loader2, ArrowLeft } from "lucide-react";
import { Cormorant } from "next/font/google";
import { toast } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const cormorant = Cormorant({ subsets: ["latin"] });

export default function AddProduct() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    longDescription: "",
    price: "",
    category: "Bamboo",
    image: "",
    rating: "5",
  });

  // Protect Route & Check Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        toast.error("You must be logged in to add products");
        router.push("/login");
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const toastId = toast.loading("Creating product...");

    try {
      const productPayload = {
        ...formData,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        email: user.email,
        createdAt: new Date(),
      };

      // POST to Backend
      const res = await fetch("https://crafty-server.vercel.app/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productPayload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Product created successfully!", { id: toastId });
        // Redirect to the new Product Details Page
        router.push(`/products/${formData.category}/${data.insertedId}`);
      } else {
        toast.error(data.message || "Failed to create product", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#fcf8f0]">
        <Loader2 className="w-8 h-8 animate-spin text-[#507662]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf8f0] py-12 px-4 sm:px-6 lg:px-8">
      <div className={`${cormorant.className} max-w-3xl mx-auto`}>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#3f3f3f]">
              Add New Product
            </h1>
            <p className="text-gray-600 mt-1">
              Create a listing for your handcrafted item.
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-[#507662] flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Cancel
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* --- SECTION 1: Basic Info --- */}
            <div className="space-y-6">
              <h3 className="text-3xl font-extrabold text-gray-900 border-b pb-2">
                Basic Details
              </h3>

              {/* Title */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Handwoven Bamboo Basket"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-1">
                  Short Description{" "}
                  <span className="text-gray-400 font-normal">
                    (Summary for cards)
                  </span>
                </label>
                <input
                  type="text"
                  name="description"
                  required
                  maxLength={120}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief summary (max 120 chars)"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] focus:border-transparent outline-none transition-all"
                />
                <p className="text-gray-400 mt-1 text-right">
                  {formData.description.length}/120
                </p>
              </div>

              {/* Long Description */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-1">
                  Long Description{" "}
                  <span className="text-gray-400 font-normal">
                    (Full details page)
                  </span>
                </label>
                <textarea
                  name="longDescription"
                  required
                  rows={6}
                  value={formData.longDescription}
                  onChange={handleChange}
                  placeholder="Detailed information about materials, size, craftsmanship, and care instructions..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* --- SECTION 2: Category & Pricing --- */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 border-b pb-2">
                Category & Pricing
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Dropdown */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] bg-white cursor-pointer"
                  >
                    <option value="Bamboo">Bamboo</option>
                    <option value="Ceramics">Ceramics</option>
                    <option value="Leather">Leather</option>
                    <option value="Textile">Textile</option>
                    <option value="Decorations">Decorations</option>
                    <option value="Jewelry">Jewelry</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] outline-none"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-1">
                    Initial Rating
                  </label>
                  <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* --- SECTION 3: Visuals --- */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 border-b pb-2">
                Product Image
              </h3>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-1">
                  Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    name="image"
                    required
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] outline-none"
                  />
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="mt-4 relative w-full h-64 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    objectFit="contain"
                    unoptimized={true}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center space-x-2 bg-[#507662] hover:bg-[#3d5a4b] text-white py-4 rounded-lg font-bold text-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Adding Product...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Add Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
