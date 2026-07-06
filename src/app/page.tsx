import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Solutions } from "@/components/Solutions";
import { Process } from "@/components/Process";
import { Care } from "@/components/Care";
import { Thinking } from "@/components/Thinking";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Stats } from "@/components/Stats";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <Solutions />
        <Process />
        <Care />
        <Thinking />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
      <SmoothScroll />
    </>
  );
}
