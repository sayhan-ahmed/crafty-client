"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Cormorant } from "next/font/google";
import { useSearchParams } from "next/navigation";

const cormorant = Cormorant({ subsets: ["latin"] });

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );

  const [categories, setCategories] = useState(["All"]);

  // Fetch Data from Database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://crafty-server.vercel.app/products");
        const data = await res.json();

        setAllProducts(data);
        setFilteredProducts(data);

        const uniqueCats = [
          "All",
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCats);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle Filtering
  useEffect(() => {
    let result = allProducts;

    // Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter(
        (product) =>
          product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, allProducts]);

  return (
    <div
      className={`${cormorant.className} min-h-screen bg-[#fcf8f0] py-12 px-4 sm:px-6 lg:px-8`}
    >
      {/* --- PAGE HEADER --- */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-[#3f3f3f] mb-4">
          Our Collection
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our handpicked selection of sustainable, artisan-crafted goods
          designed to bring warmth to your home.
        </p>
      </div>

      {/* --- Search & Filter --- */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#507662] focus:border-transparent transition-all"
            />
          </div>

          {/* Category Filter Dropdown */}
          <div className="relative w-full md:w-64">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#507662] cursor-pointer bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* --- PRODUCTS GRID --- */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          // Loading Skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg h-96 animate-pulse"
              ></div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                {/* Card Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={product.image || "/images/placeholder.jpg"}
                    alt={product.name}
                    fill
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                    unoptimized={true}
                  />
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#507662] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col grow">
                  <div className="grow">
                    {/* Title */}
                    <h3 className="text-2xl h-1/2 font-bold text-gray-800 mb-2 group-hover:text-amber-700 transition-colors">
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-gray-500 text-base line-clamp-2 mb-4">
                      {product.description ||
                        "Handcrafted with care using sustainable materials. A perfect addition to your collection."}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex text-xl font-extrabold text-[#507662]">
                      <span className="mt-0.5 mr-0.5">$</span>
                      <span>{product.price}</span>
                    </div>

                    {/* Details Button */}
                    <Link
                      href={`/products/${product.category}/${product._id}`}
                      className="inline-flex items-center text-base font-bold text-amber-700 hover:text-amber-800 transition-all group-hover:translate-x-1 duration-300"
                    >
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              No products found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 text-amber-700 font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
