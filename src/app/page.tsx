import { Hero } from "@/components/Hero";
import { Capabilities } from "@/components/Capabilities";

export default function Home() {
  return (
    <div className="bg-black font-body">
      <Hero />
      <Capabilities />
    </div>
  );
}
