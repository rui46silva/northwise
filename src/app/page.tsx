import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Solutions } from "@/components/Solutions";
import { Process } from "@/components/Process";
import { Care } from "@/components/Care";
import { Thinking } from "@/components/Thinking";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Solutions />
        <Process />
        <Care />
        <Thinking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
