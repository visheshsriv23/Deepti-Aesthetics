import React from "react";
import p1 from "../../products/p1.jpg";
import p2 from "../../products/p2.jpg";

const PROJECTS = [
  {
    id: "p1",
    title: "Pink Tiger Peeking Keycover",
    category: "CROCHET KEYCOVERS",
    desc: "Hand-knit soft yarn keyholder to keep your keys cozy, safe, and easy to find in your bag.",
    image: {p1},
    fallback: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "p2",
    title: "Watermelon Slice Crochet Coaster",
    category: "HOME & TABLEWARE",
    desc: "Bright, multi-layered cotton coaster handcrafted to add a slice of fruity fun to your desk or table.",
    image: {p2},
    fallback: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "p3",
    title: "Editorial Atelier Monograph",
    category: "Brand & Paper Goods",
    desc: "Bespoke print design, custom letterpress stationery, and tactile textured packaging suites.",
    image: "/products/p3.jpg",
    fallback: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80",
  },
];

export default function ProjectCatalog() {
  return (
    <section id="projects" className="py-24 bg-theme-bg border-t border-theme-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[11px] uppercase tracking-[0.3em] text-theme-muted mb-2">Project Catalog</p>
          <h2 className="text-3xl md:text-5xl font-serif text-theme-dark italic font-normal">
            Curated Collections
          </h2>
          <div className="w-12 h-[1px] bg-theme-border mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group flex flex-col">
              <div className="aspect-[4/5] bg-[#EDE8E0] overflow-hidden rounded-sm mb-5 border border-theme-border/60">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    e.currentTarget.src = project.fallback;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-theme-muted mb-1 font-medium">
                {project.category}
              </span>
              <h3 className="font-serif text-2xl text-theme-dark mb-2 group-hover:text-theme-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-xs leading-relaxed text-theme-muted font-light font-sans">
                {project.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}