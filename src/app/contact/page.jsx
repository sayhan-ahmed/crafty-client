"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { Cormorant } from "next/font/google";
import toast from "react-hot-toast";

const cormorant = Cormorant({ subsets: ["latin"] });

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // No BACKEND yet
  const handleSubmit = (e) => {
    e.preventDefault();
    const loadingId = toast.loading("Sending message...");

    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.", {
        id: loadingId,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fcf8f0] py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div
        className={`${cormorant.className} max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16`}
      >
        {/* --- LEFT SIDE: Info & Context --- */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <span className="text-amber-700 font-extrabold uppercase tracking-wider text-sm mb-2 block">
              Contact Support
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-[#3f3f3f] leading-none">
              We’d love to <br /> hear from you.
            </h1>
            <p className="text-gray-600 mt-6 text-xl leading-relaxed max-w-md">
              Have a question about a product, shipping, or custom orders? Fill
              out the form and our artisan support team will get back to you
              within 24 hours.
            </p>
          </div>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="bg-[#507662]/10 p-3 rounded-full text-[#507662]">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Email Us</h3>
                <p className="text-gray-500">hello@crafty.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="bg-[#507662]/10 p-3 rounded-full text-[#507662]">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Call Us</h3>
                <p className="text-gray-500">+880 (123) 456-7890</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="bg-[#507662]/10 p-3 rounded-full text-[#507662]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Visit HQ</h3>
                <p className="text-gray-500">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: Contact Form --- */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              >
                <option value="">Select a topic</option>
                <option value="Order Status">Order Status</option>
                <option value="Custom Order">Custom Request</option>
                <option value="Returns">Returns & Refunds</option>
                <option value="Other">Other Inquiry</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="How can we help you today?"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#507662] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-[#507662] hover:bg-[#3d5a4b] text-white py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
