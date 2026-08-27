import React from "react";
import hero from "../../products/hero.jpg";

export default function Hero() {
  return (
    <section id="hero" className="px-6 pt-6 pb-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Large Editorial Feature Image */}
        <div className="lg:col-span-8 overflow-hidden rounded-sm border border-theme-border aspect-[12/10] bg-[#EBE5DC]">
          <img
            src={hero}
            alt="Deepti Aesthetics Gallery"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80";
            }}
            className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-1000 ease-out"
          />
        </div>

        {/* Hero Editorial Copy */}
        <div className="lg:col-span-4 flex flex-col justify-center items-start lg:pl-4">
          <span className="text-[11px] uppercase tracking-[0.3em] text-theme-muted mb-3">
            HANDMADE WITH LOVE
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-theme-dark italic font-normal leading-[1.15] mb-6">
            Bringing cozy charm and playful warmth to your everyday essentials.
          </h1>
          <p className="text-xs text-theme-muted leading-relaxed font-light mb-8">
            Handcrafted crochet keycovers, cute coasters, and charming artisanal keepsakes designed to brighten your daily routine.
          </p>
          <a
            href="#order"
            className="inline-block border-b-2 border-theme-dark text-[11px] uppercase tracking-[0.25em] font-semibold text-theme-dark pb-1 hover:text-theme-accent hover:border-theme-accent transition-colors"
          >
            Explore Catalog & Order
          </a>
        </div>
      </div>
    </section>
  );
}