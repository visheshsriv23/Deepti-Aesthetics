import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-theme-bg border-t border-theme-border">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-theme-muted mb-2">Custom Commissions & Hello</p>
        <h2 className="text-3xl md:text-5xl font-serif text-theme-dark italic font-normal mb-6">
            Have a custom crochet idea in mind?
        </h2>
        <p className="text-xs text-theme-muted max-w-lg mx-auto leading-relaxed font-light mb-12">
            Whether you want a personalized bag colorway, matching gift sets, or custom sizing, feel free to say hi!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs uppercase tracking-[0.18em] text-theme-dark">
          <div className="p-6 border border-theme-border bg-white flex flex-col items-center">
            <Mail size={18} className="text-theme-muted mb-3" />
            <span className="text-[10px] text-theme-muted mb-1">Direct Inquiries</span>
            <span className="font-medium lowercase tracking-normal">tanishkasrivastava57@gmail.com</span>
          </div>

          <div className="p-6 border border-theme-border bg-white flex flex-col items-center">
            <Phone size={18} className="text-theme-muted mb-3" />
            <span className="text-[10px] text-theme-muted mb-1">Studio Desk</span>
            <span className="font-medium">+91 9415285971</span>
          </div>

          <div className="p-6 border border-theme-border bg-white flex flex-col items-center">
            <MapPin size={18} className="text-theme-muted mb-3" />
            <span className="text-[10px] text-theme-muted mb-1">Saket-Nagar</span>
            <span className="font-medium">Varanasi, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}