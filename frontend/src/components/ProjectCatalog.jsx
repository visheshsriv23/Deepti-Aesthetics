import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS_LIST } from "../data/products";

export default function ProjectCatalog() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(PRODUCTS_LIST.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = PRODUCTS_LIST.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="projects" className="py-24 bg-theme-bg border-t border-theme-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-theme-muted mb-2">Handmade Creations</p>
          <h2 className="text-3xl md:text-5xl font-serif text-theme-dark italic font-normal">
            The Crochet Collection
          </h2>
          <div className="w-12 h-[1px] bg-theme-border mx-auto mt-4"></div>
        </div>

        {/* 4 Items per Page Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentItems.map((item) => (
            <div key={item.id} className="group flex flex-col justify-between bg-white border border-theme-border p-4">
              <div>
                <div className="aspect-square bg-[#EDE8E0] overflow-hidden rounded-sm mb-4 border border-theme-border/60">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&auto=format&fit=crop&q=80";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-theme-muted font-medium">
                    {item.category}
                  </span>
                  <span className="text-xs font-serif font-semibold text-theme-dark">
                    ₹{item.price}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-theme-dark mb-2 leading-snug group-hover:text-theme-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-theme-muted font-light">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-theme-border/40">
                <a
                  href="#order"
                  className="block text-center text-[10px] uppercase tracking-[0.2em] py-2 border border-theme-dark text-theme-dark hover:bg-theme-dark hover:text-white transition-colors"
                >
                  Order This
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Navigation */}
        <div className="flex justify-center items-center gap-3 mt-14">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border border-theme-border text-theme-dark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`w-9 h-9 text-xs font-serif transition-colors ${
                currentPage === num
                  ? "bg-theme-dark text-white font-semibold"
                  : "bg-white border border-theme-border text-theme-dark hover:bg-[#F2EDE4]"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border border-theme-border text-theme-dark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}