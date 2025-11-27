import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Cormorant } from "next/font/google";

const cormorant = Cormorant({ subsets: ["latin"] });

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Interior Designer",
    image: "/images/user-1.jpg",
    rating: 5,
    text: "I was looking for unique pieces for a client's living room and found the perfect hand-woven rug here. The quality is unmatched and the story behind the artisan made it even more special.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Ceramics Collector",
    image: "/images/user-2.jpg",
    rating: 5,
    text: "The shipping was incredibly fast and the packaging was eco-friendly, which I appreciate. The bowl looks even better in person than it did in the photos. Truly functional art.",
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "DIY Enthusiast",
    image: "/images/user-3.jpg",
    rating: 4,
    text: "I love supporting small businesses and independent creators. Crafty makes it so easy to find beautiful, sustainable items. My new bamboo lamp has transformed my workspace.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#507662]/5">
      <div
        className={`${cormorant.className} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
      >
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 mb-4">
            <Quote className="w-9 h-9 text-amber-600 fill-current" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Stories from Our Community
          </h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto">
            See why thousands of customers choose Crafty for their home and
            lifestyle needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white text-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 relative"
            >
              {/* Stars */}
              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "text-amber-500 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 mb-8 leading-relaxed italic">
                {review.text}
              </p>

              {/* User Info */}
              <div className="flex items-center space-x-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    objectFit="cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {review.name}
                  </h4>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
