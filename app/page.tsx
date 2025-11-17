import Courses from "@/components/Courses";
import Mission from "@/components/Mission";
import ProgramsSection from "@/components/Programs";
import Supports from "@/components/Supports";
import Testimonials from "@/components/Testimonials";
import Benefits from "@/components/Benefits";
import Partners from "@/components/Partners";
import Connection from "@/components/Connection";
import Hero from "@/components/Hero";

export default function Home() {
  return (
      <main className="h-full">
        <Hero />
        <Courses />
        <Mission />
        <ProgramsSection />
        <Supports />
        <Testimonials />
        <Benefits />
        <Partners />
        <Connection />
      </main>
  );
}
