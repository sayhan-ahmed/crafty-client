import { Cormorant } from "next/font/google";
const cormorant = Cormorant({ subsets: ["latin"] });

export default function CraftyLoader() {
  return (
    <div className="min-h-screen bg-[#fcf8f0] flex flex-col justify-center items-center z-50">
      <div className="crafty-spinner mb-8">
        <div className="crafty-block"></div>
        <div className="crafty-block"></div>
        <div className="crafty-block"></div>
        <div className="crafty-block"></div>
      </div>

      <h2
        className={`${cormorant.className} text-2xl font-bold text-[#3f3f3f] animate-pulse`}
      >
        Crafting your experience...
      </h2>
    </div>
  );
}
