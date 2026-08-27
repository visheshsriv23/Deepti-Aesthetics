import React from "react";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-theme-bg/95 backdrop-blur-md border-b border-theme-border">
      {/* Top Banner styled identically to the reference image */}
      <div className="bg-theme-banner text-[#FAF8F5] text-[10px] uppercase tracking-[0.25em] py-2 px-6 flex justify-between items-center font-sans">
      <div className="flex items-center gap-4">
        <FaFacebookF size={12} className="cursor-pointer" />
        <FaInstagram size={12} className="cursor-pointer" />
        <FaPinterestP size={12} className="cursor-pointer" />
        </div>
        <p className="hidden md:block">HANDCRAFTED CROCHET & CUTE EVERYDAY AESTHETICS • WORLDWIDE SHIPPING</p>
        <p className="tracking-[0.2em]">Curated 2026 Collection</p>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="w-1/3 hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] text-theme-muted font-medium">
          <a href="#hero" className="hover:text-theme-dark transition-colors">Home</a>
          <a href="#projects" className="hover:text-theme-dark transition-colors">Projects</a>
          <a href="#order" className="hover:text-theme-dark transition-colors">Order</a>
          <a href="#contact" className="hover:text-theme-dark transition-colors">Contact</a>
        </div>

        <div className="w-full md:w-1/3 text-center">
          <a href="/" className="font-serif text-2xl md:text-3xl tracking-[0.06em] text-theme-dark font-light">
            Deepti Aesthetics
          </a>
        </div>

        <div className="w-1/3 hidden md:flex justify-end items-center gap-6 text-[11px] uppercase tracking-[0.2em]">
          <a
            href="#order"
            className="border-b border-theme-dark pb-0.5 text-theme-dark hover:text-theme-accent transition-colors font-medium"
          >
            Commission Art
          </a>
        </div>
      </nav>
    </header>
  );
}