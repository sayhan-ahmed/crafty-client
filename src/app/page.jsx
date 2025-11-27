import Category from "@/components/Category";
import FeaturedCollection from "@/components/FeaturedCollection";
import Features from "@/components/Features";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="bg-amber-50/50 ">
      <Hero />
      <Features />
      <Category />
      <FeaturedCollection />
    </div>
  );
}
