// components/Category.jsx
import Link from "next/link";
import Image from "next/image";
import { Cormorant } from "next/font/google";
const cormorant = Cormorant({ subsets: ["latin"] });

const categoriesData = [
  {
    name: "Bamboo",
    image: "/images/cat-bamboo.png",
    href: "/products?category=bamboo",
  },
  {
    name: "Leather",
    image: "/images/cat-leather.png",
    href: "/products?category=leather",
  },
  {
    name: "Decorations",
    image: "/images/cat-decorations.png",
    href: "/products?category=decorations",
  },
  {
    name: "Ceramics",
    image: "/images/cat-ceramics.png",
    href: "/products?category=ceramics",
  },
  {
    name: "Textile",
    image: "/images/textile-2.png",
    href: "/products?category=textile",
  },
  {
    name: "Jewelry",
    image: "/images/cat-jewelry.png",
    href: "/products?category=jewelry",
  },
];

export default function Category() {
  return (
    <section className="bg-[#fcf8f0] py-20 md:py-28 relative w-full overflow-hidden">
      {/* --- BACKGROUND WAVE --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <svg
          className="w-full h-full opacity-50 text-gray-400/50"
          viewBox="0 0 800 600"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 100 100 C 200 -50, 400 300, 500 100 S 700 300, 800 400"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.8"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="150"
            cy="450"
            r="50"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 50 350 Q 150 450, 250 350 T 450 350"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.8"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* --- CONTENT --- */}
      <div
        className={`${cormorant.className} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10`}
      >
        <h2 className="text-5xl md:text-6xl font-extrabold text-[#3f3f3f] mb-2 tracking-tighter">
          SHOP BY CATEGORY
        </h2>

        <p className="text-xl text-gray-700 mb-16 font-medium">
          Techniques to Calm Your Space
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10">
          {categoriesData.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group flex flex-col items-center space-y-4 cursor-pointer"
            >
              <div className="relative w-full aspect-square max-w-[200px] mx-auto rounded-full overflow-hidden shadow-lg border border-gray-100 transition-shadow duration-300 group-hover:shadow-2xl border-opacity-50 hover:ring-2 hover:ring-amber-700">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>

              <p className="text-lg font-semibold uppercase tracking-wider text-gray-800 transition-colors duration-300 group-hover:text-amber-700">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
