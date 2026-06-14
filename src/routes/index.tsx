import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/sections/home/about";
import { BecomeDev } from "@/components/sections/home/become-dev";
import { Engineers } from "@/components/sections/home/engineers";
import { Faq } from "@/components/sections/home/faq";
import { Features } from "@/components/sections/home/features";
import { Footer } from "@/components/sections/home/footer";
import { Hero } from "@/components/sections/home/hero";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <About />
      <BecomeDev />
      <Engineers />
      <Faq />
      <Footer />
    </div>
  );
}
