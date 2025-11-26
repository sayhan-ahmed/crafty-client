"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, A11y } from "swiper/modules";

import { Cormorant } from "next/font/google";
const cormorant = Cormorant({ subsets: ["latin"] });

// --- SLIDE DATA ---
const slidesData = [
  {
    headline: "Handmade Manufacturing",
    subtitle: "High-Performance Ceramics",
    image1: "/images/ceramic.png", // Small center image
    image2: "/images/ceramic-2.png", // Large right image
    bgTexture: "bg-[#f9f5ed]", // Light background color from image
  },
  {
    headline: "Small Batch Textiles",
    subtitle: "Artisan-Woven Home Goods",
    image1: "/images/textile-2.png",
    image2: "/images/textile.png",
    bgTexture: "bg-[#f9f5ed]",
  },
  {
    headline: "Sustainable Woodcraft",
    subtitle: "Naturally Sourced Furniture & Decor",
    image1: "/images/woodcraft.png",
    image2: "/images/woodcraft-2.png",
    bgTexture: "bg-[#f9f5ed]",
  },
];

// --- SLIDE LAYOUT COMPONENT ---
const HeroSlide = ({ data }) => (
  <div
    className={`w-full h-full relative flex items-center ${data.bgTexture} overflow-hidden`}
  >
    {/* Wavy Lines */}
    <svg
      className="absolute top-1/2 left-1/4 w-full h-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-gray-400/30"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 100 100 C 200 -50, 400 300, 500 100 S 700 300, 800 400"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
      <circle cx="150" cy="450" r="50" stroke="currentColor" strokeWidth="1" />
      <path
        d="M 50 350 Q 150 450, 250 350 T 450 350"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
    </svg>

    <div
      className={`${cormorant.className} max-w-7xl mx-auto w-full h-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-16`}
    >
      {/* Left Content: Text Block */}
      <div className="relative z-10 w-full md:w-1/2 space-y-6 pr-4 sm:pr-8">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#3f3f3f] leading-none">
          {data.headline}
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 font-medium tracking-wide">
          {data.subtitle}
        </p>

        {/* CTA Button */}
        <Link
          href="/products"
          className="inline-block mt-4 text-lg font-semibold px-8 py-3 rounded-md bg-[#c76536] text-white shadow-lg hover:bg-[#a6532d] transition-all duration-300 ease-out hover:scale-105"
        >
          VIEW COLLECTION
        </Link>

        {/* Navigation Arrows */}
        <div className="absolute bottom-[-100px] left-0 flex space-x-6">
          <button
            className="p-3 text-gray-700 hover:text-[#c76536] transition-colors swiper-button-prev-custom"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="p-3 text-gray-700 hover:text-[#c76536] transition-colors swiper-button-next-custom"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Right Content: Layered Images */}
      <div className="hidden md:block w-1/2 relative h-full items-center justify-end">
        {/* Large Right Image */}
        <div className="absolute right-0 top-0 w-[70%] h-[90%] bg-gray-300 shadow-xl shadow-black/50 overflow-hidden">
          <Image
            src={data.image2}
            alt="Large craft item"
            fill
            objectFit="cover"
            className="object-top-right"
          />
        </div>

        {/* Small Center Image */}
        <div className="absolute bottom-1/4 left-1/12 w-[50%] h-[50%] bg-white p-2 shadow-xl shadow-black/40 overflow-hidden">
          <Image
            src={data.image1}
            alt="Artisan working"
            fill
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  </div>
);

// --- SWIPER WRAPPER ---
export default function Hero() {
  const prevRef = "swiper-button-prev-custom";
  const nextRef = "swiper-button-next-custom";

  return (
    <section className="h-[90vh] min-h-[600px] overflow-hidden bg-[#f9f5ed]">
      <Swiper
        modules={[Navigation, Autoplay, A11y]}
        slidesPerView={1}
        loop={true}
        speed={800}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: `.${prevRef}`,
          nextEl: `.${nextRef}`,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = document.querySelector(
            `.${prevRef}`
          );
          swiper.params.navigation.nextEl = document.querySelector(
            `.${nextRef}`
          );
          swiper.navigation.update();
        }}
        className="w-full h-full"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <HeroSlide data={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
