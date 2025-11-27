import { Sparkles } from "lucide-react";
import { Cormorant } from "next/font/google";

const cormorant = Cormorant({ subsets: ["latin"] });

export default function ComingSoon() {
  return (
    <div
      className={`${cormorant.className} flex flex-col items-center pt-8 justify-center px-4 bg-[#fcf8f0]  rounded-lg border border-dashed border-gray-300`}
    >
      <div className="bg-white p-4 rounded-full shadow-sm mb-3">
        <Sparkles className="w-8 h-8 text-amber-600" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#3f3f3f] mb-3 text-center">
        Better UI is Coming Soon
      </h2>
      <p className="text-gray-500 text-lg max-w-md text-center mb-8">
        Stay tuned for something beautiful.
      </p>
    </div>
  );
}
