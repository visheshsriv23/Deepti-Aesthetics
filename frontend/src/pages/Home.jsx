import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProjectCatalog from "../components/ProjectCatalog";
import OrderSection from "../components/OrderSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-theme-bg font-sans">
      <Navbar />
      <Hero />
      <ProjectCatalog />
      <OrderSection />
      <ContactSection />
      
      {/* Editorial Minimalist Footer */}
      <footer className="py-8 bg-theme-dark text-[#D5CEC2] text-[10px] uppercase tracking-[0.25em] text-center border-t border-neutral-800 font-sans">
        © 2026 Deepti Aesthetics. All rights reserved.
      </footer>
    </div>
  );
}