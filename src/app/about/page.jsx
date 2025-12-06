import Image from "next/image";
import { Cormorant } from "next/font/google";
import { Heart, Leaf, Hammer } from "lucide-react";

const cormorant = Cormorant({ subsets: ["latin"] });

export default function About() {
  return (
    <div className="bg-[#fcf8f0] min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div
        className={`${cormorant.className} max-w-4xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden`}
      >
        {/* Top Image Banner */}
        <div className="relative h-64 sm:h-80 w-full bg-gray-200">
          <Image
            src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=2449&auto=format&fit=crop"
            alt="Crafty Workshop"
            fill
            objectFit="cover"
            className="hover:scale-105 transition-transform duration-1000"
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <h1 className="text-7xl text-white font-bold tracking-tight">
              Our Story
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 sm:p-12 text-center">
          <p className="text-amber-700 uppercase tracking-[0.2em] mb-4">
            <span className="text-base font-bold "> Est.</span>{" "}
            <span className="text-xl font-medium">2024</span>
          </p>

          <h2 className="text-4xl text-[#3f3f3f] font-bold mb-6">
            Crafting with Conscience.
          </h2>

          <div className="text-lg prose prose-stone mx-auto text-gray-600 leading-relaxed space-y-4 max-w-2xl">
            <p>
              At <strong className="text-amber-700">Crafty</strong>, we believe
              that the things we surround ourselves with should tell a story. We
              started this journey to bridge the gap between master artisans in
              remote villages and modern homes around the world.
            </p>
            <p>
              Every ceramic vase, woven basket, and leather bag you see here is
              made by human hands, not machines. We prioritize slow production,
              fair wages, and sustainable materials.
            </p>
          </div>

          {/* Simple Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-100">
            <div className="flex flex-col items-center">
              <Leaf className="w-8 h-8 text-[#507662] mb-3" />
              <h3 className="font-bold text-gray-800">100% Sustainable</h3>
              <p className="text-sm text-gray-500 mt-1">
                Eco-friendly materials only.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Hammer className="w-8 h-8 text-[#507662] mb-3" />
              <h3 className="font-bold text-gray-800">Handmade</h3>
              <p className="text-sm text-gray-500 mt-1">
                Crafted with skill & care.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-8 h-8 text-[#507662] mb-3" />
              <h3 className="font-bold text-gray-800">Fair Trade</h3>
              <p className="text-sm text-gray-500 mt-1">
                Supporting local artisans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
