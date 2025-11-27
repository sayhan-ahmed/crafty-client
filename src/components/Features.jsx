import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Heart,
  Leaf,
  Diamond,
  VolumeX,
} from "lucide-react";
import { GiStoneCrafting } from "react-icons/gi";
import { Cormorant } from "next/font/google";
const cormorant = Cormorant({ subsets: ["latin"] });

// Data for the checkmark list
const benefitsList = [
  { text: "Ethically Sourced Materials", icon: Leaf },
  { text: "Handmade by Master Artisans", icon: Heart },
  { text: "Rigorous Quality Assurance", icon: Diamond },
  { text: "Transparent Pricing & Sourcing", icon: CheckCircle },
  { text: "Exclusive Artist Collections", icon: Diamond },
  { text: "Carbon Neutral Shipping", icon: Leaf },
  { text: "Hassle-Free Returns Policy", icon: CheckCircle },
  { text: "Dedicated Artisan Support", icon: Heart },
];

// Data for the statistics boxes
const statsData = [
  {
    value: "10K+",
    label: "Satisfied Customers",
    bgColor: "bg-[#507662]",
  },
  {
    value: "100+",
    label: "Verified Global Artisans",
    bgColor: "bg-[#c76536]",
  },
];

export default function Features() {
  return (
    <section className="py-20">
      <div
        className={`${cormorant.className} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
      >
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* LEFT COLUMN: Text and Benefits List */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Accent Tag */}
            <p className="flex items-center space-x-2 text-sm font-bold uppercase text-amber-700">
              <GiStoneCrafting />
              <span>DURABLE & ETHICAL</span>
            </p>

            {/* Headline */}
            <h2 className="text-5xl md:text-6xl font-extrabold text-[#3f3f3f]">
              The Future of Sustainable Crafting
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-xl">
              We connect you directly to the source, ensuring every unique
              product is ethically made, fairly priced, and built to last
              generations.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-4">
              {benefitsList.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <item.icon className="w-5 h-5 text-[#507662]" />
                  <span className="text-base text-gray-700 font-medium">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/about"
              className="inline-flex items-center space-x-3 text-lg font-semibold px-8 py-3 rounded-md bg-[#c76536] text-white shadow-lg hover:bg-[#a6532d] transition-all duration-300 ease-out hover:scale-105"
            >
              <span>Learn Our Story</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* RIGHT COLUMN: Layered Images and Stats */}
          <div className="w-full lg:w-1/2 relative h-[600px] md:h-[700px] mt-12 lg:mt-10">
            {/* Image 1 */}
            <div className="absolute left-[30%] top-[5%] w-[55%] h-[55%] shadow-xl overflow-hidden z-30">
              <Image
                src="/images/artisan.png"
                alt="Artisan inspecting product"
                fill
                objectFit="cover"
              />
            </div>

            {/* Stat Box 1: Top Right */}
            <div
              className={`absolute top-[0%] right-[5%] w-[45%] p-5 text-white shadow-2xl z-40 ${statsData[1].bgColor}`}
            >
              <p className="text-4xl md:text-5xl font-extrabold">
                {statsData[0].value}
              </p>
              <p className="text-base font-medium uppercase tracking-wider">
                {statsData[0].label}
              </p>
            </div>

            {/* Stat Box 2: Bottom Center */}
            <div
              className={`absolute bottom-[7%] left-[5%] w-[45%] p-5 text-white shadow-2xl z-30 ${statsData[0].bgColor}`}
            >
              <p className="text-4xl md:text-5xl font-extrabold">
                {statsData[1].value}
              </p>
              <p className="text-base font-medium uppercase tracking-wider">
                {statsData[1].label}
              </p>
            </div>

            {/* Image 2 */}
            <div className="absolute bottom-[25%] left-0 w-[55%] h-[50%] shadow-2xl z-20 overflow-hidden">
              <Image
                src="/images/artisan-2.png"
                alt="Abstract graphic element"
                fill
                objectFit="cover"
                className="opacity-90"
              />
            </div>

            {/* Image 3 */}
            <div className="absolute right-0 bottom-[0%] w-[65%] h-[50%] shadow-xl overflow-hidden z-10">
              <Image
                src="/images/artisan-ceramics.png"
                alt="Artisan ceramics"
                fill
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
