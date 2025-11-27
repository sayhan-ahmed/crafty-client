"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  ExternalLink,
  Calendar,
  Package,
  AlertTriangle,
} from "lucide-react";
import { Cormorant } from "next/font/google";
import { toast } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const cormorant = Cormorant({ subsets: ["latin"] });

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Check Auth & Fetch Data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        fetchOrders(currentUser.email);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch Orders from Backend
  const fetchOrders = async (email) => {
    try {
      const res = await fetch(
        `https://crafty-server.vercel.app/orders?email=${email}`
      );
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Confirmation modal
  const confirmDelete = (id) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  // Performs the deletion
  const handleDelete = async () => {
    if (!itemToDelete) return;

    setShowDeleteModal(false);
    const toastId = toast.loading("Removing item...");
    try {
      const res = await fetch(
        `https://crafty-server.vercel.app/orders/${itemToDelete}?email=${user.email}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        toast.success("Item removed", { id: toastId });
        setOrders(orders.filter((order) => order._id !== itemToDelete));
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to delete", { id: toastId });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error removing item", { id: toastId });
    } finally {
      setItemToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcf8f0] py-12 px-4 flex justify-center items-start">
        <p className="text-xl text-gray-500 animate-pulse">
          Loading your collection...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`${cormorant.className} max-w-5xl mx-auto`}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[#3f3f3f]">My Orders</h1>
            <p className="text-gray-600 text-lg mt-1">
              Manage your purchases and tracked items.
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
            <span className="text-gray-500 font-medium">Total Items:</span>
            <span className="ml-2 text-2xl font-bold text-[#507662]">
              {orders.length}
            </span>
          </div>
        </div>

        {/* Content */}
        {orders.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              It looks like you have not placed any orders yet. Explore our
              collection to find something unique.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#507662] hover:bg-[#3d5a4b] transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          // Orders Grid
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row"
              >
                {/* Image Section */}
                <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-gray-100 shrink-0">
                  <Image
                    src={order.image || "/images/placeholder.jpg"}
                    alt={order.name}
                    fill
                    objectFit="cover"
                    unoptimized={true}
                  />
                </div>

                {/* Details Section */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex gap-4">
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-amber-700 bg-amber-50 rounded-full uppercase tracking-wide">
                            {order.category}
                          </span>
                          <div className="hidden md:flex items-center gap-2 text-sm text-[#507662]">
                            <Calendar className="w-3 h-3 text-[#507662]" />
                            <span>
                              Ordered on{" "}
                              {new Date(
                                order.orderedAt || Date.now()
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          {order.name}
                        </h3>
                      </div>
                      <span className="flex -mt-2 text-2xl font-bold text-[#507662]">
                        <span className="mt-0.5 mr-0.5">$</span>
                        <span>{order.price}</span>
                      </span>
                    </div>
                    <div className="flex md:hidden items-center gap-2 mt-3 text-sm text-[#507662]">
                      <Calendar className="w-3 h-3 text-[#507662]" />
                      <span>
                        Ordered on{" "}
                        {new Date(
                          order.orderedAt || Date.now()
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 border-t border-gray-50 pt-4">
                    <Link
                      href={`/products/${order.category}/${order.productId}`}
                      className="flex items-center text-base font-semibold text-gray-600 hover:text-[#507662] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Product
                    </Link>

                    <button
                      onClick={() => confirmDelete(order._id)}
                      className="flex items-center text-base font-semibold text-red-500 hover:text-red-700 transition-colors ml-auto"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3
                className={`${cormorant.className} text-2xl font-bold text-gray-900 mb-2`}
              >
                Remove Item?
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to remove this item from your orders? This
                action cannot be undone.
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setItemToDelete(null);
                  }}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                >
                  Yes, Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
