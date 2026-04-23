import { useEffect } from "react";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Collection from "@/components/site/Collection";
import Lookbook from "@/components/site/Lookbook";
import Manifesto from "@/components/site/Manifesto";
import Footer from "@/components/site/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Rick Owens — Trinity FW26 Collection";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Rick Owens FW26 — Trinity of dust. New collection of avant-garde garments, leather, drape and silhouette.");

    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="grain">
      <Nav />
      <Hero />
      <Marquee />
      <Collection />
      <Lookbook />
      <Manifesto />
      <Footer />
    </main>
  );
};

export default Index;
