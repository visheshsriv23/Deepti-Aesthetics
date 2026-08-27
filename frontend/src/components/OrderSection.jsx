import React, { useState } from "react";
import { Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react";

const PRODUCTS_LIST = [
  { id: "art-101", title: "Pink Tiger Peeking Keycover", price: 200 },
  { id: "art-102", title: "Watermelon Slice Crochet Coaster", price: 300 },
  { id: "art-103", title: "Bespoke Brand Identity & Palette Guide", price: 6500 },
  { id: "art-104", title: "Minimalist Sculptural Table Decor", price: 1950 },
  { id: "art-105", title: "Custom Editorial Invitation Suite (50 Units)", price: 4800 },
];
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://deepti-backend.onrender.com";

export default function OrderSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
  });

  const [selectedProductId, setSelectedProductId] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleAddItem = () => {
    if (!selectedProductId) return;
    const target = PRODUCTS_LIST.find((p) => p.id === selectedProductId);
    if (!target) return;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.productId === target.id);
      if (existing) {
        return prevCart.map((item) =>
          item.productId === target.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prevCart,
        { productId: target.id, title: target.title, price: target.price, quantity: 1 },
      ];
    });
    setSelectedProductId("");
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.productId !== id));
  };

  const totalAmount = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    // Validate compulsory requirements
    if (!formData.name.trim() || !formData.email.trim() || !formData.contactNumber.trim()) {
      setStatus({ type: "error", message: "Name, email, and contact number are compulsory." });
      return;
    }

    if (cart.length === 0) {
      setStatus({ type: "error", message: "Please select and add at least one product to your order." });
      return;
    }

    setLoading(true);

    try {
        const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contactNumber: formData.contactNumber,
          items: cart,
          totalAmount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Thank you! Your custom order inquiry has been received. We will reach out shortly.",
        });
        setFormData({ name: "", email: "", contactNumber: "" });
        setCart([]);
      } else {
        setStatus({ type: "error", message: data.error || "Failed to submit your order." });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "Could not connect to backend server. Make sure server is running on port 5000.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="order" className="py-24 bg-theme-lightBg border-t border-theme-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[11px] uppercase tracking-[0.3em] text-theme-muted mb-2">Commissions</p>
          <h2 className="text-3xl md:text-5xl font-serif text-theme-dark italic font-normal">
            Place Your Order
          </h2>
          <div className="w-12 h-[1px] bg-theme-border mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Compulsory Order Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white p-8 md:p-10 border border-theme-border shadow-sm space-y-6"
          >
            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] text-theme-dark font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vishesh Srivastava"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-theme-border text-sm focus:outline-none focus:border-theme-dark rounded-none placeholder:text-neutral-400 font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] text-theme-dark font-medium mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-theme-border text-sm focus:outline-none focus:border-theme-dark rounded-none placeholder:text-neutral-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] text-theme-dark font-medium mb-2">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9876543210"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-theme-border text-sm focus:outline-none focus:border-theme-dark rounded-none placeholder:text-neutral-400 font-sans"
                />
              </div>
            </div>

            {/* Product Dropdown Add Item */}
            <div className="w-full">
                <label className="block text-[11px] uppercase tracking-[0.2em] text-theme-dark font-medium mb-2">
                    Select Aesthetic Works / Products <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <div className="flex-1 min-w-0">
                    <select
                        value={selectedProductId}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-theme-border text-xs sm:text-sm focus:outline-none focus:border-theme-dark rounded-none text-theme-dark font-sans truncate"
                    >
                        <option value="">-- Choose an item --</option>
                        {PRODUCTS_LIST.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                            {prod.title} — ₹{prod.price.toLocaleString("en-IN")}
                        </option>
                        ))}
                    </select>
                    </div>
                    <button
                    type="button"
                    onClick={handleAddItem}
                    className="w-full sm:w-auto px-6 py-3 bg-theme-banner text-white text-[11px] uppercase tracking-[0.2em] hover:bg-theme-dark transition-colors flex justify-center items-center gap-1 font-medium shrink-0"
                    >
                    <Plus size={14} /> Add
                    </button>
                </div>
                </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-theme-dark text-white text-[11px] uppercase tracking-[0.25em] font-semibold hover:opacity-90 transition-opacity mt-4"
            >
              {loading ? "Processing Order..." : "Confirm & Send Order Inquiry"}
            </button>

            {status.message && (
              <div
                className={`p-4 text-xs tracking-wider flex items-center gap-2 ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{status.message}</span>
              </div>
            )}
          </form>

          {/* Dynamic Calculated Price Box on the Side */}
          <div className="lg:col-span-5 bg-white p-8 md:p-10 border border-theme-border shadow-sm flex flex-col justify-between min-h-[420px]">
            <div>
              <h3 className="font-serif text-2xl text-theme-dark pb-4 border-b border-theme-border mb-6">
                Your Order Summary
              </h3>

              {cart.length === 0 ? (
                <div className="text-center py-16 text-theme-muted italic text-xs font-light">
                  <p>No products added yet.</p>
                  <p className="mt-1">Pick items from the dropdown to see live calculated totals.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between items-start text-xs border-b border-theme-border/60 pb-3"
                    >
                      <div className="pr-4">
                        <p className="font-medium text-theme-dark">{item.title}</p>
                        <p className="text-theme-muted mt-0.5 font-light">Quantity: {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-theme-dark">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-neutral-400 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-theme-border mt-8">
              <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] text-theme-dark font-medium">
                <span>Calculated Total</span>
                <span className="font-serif text-2xl font-normal text-theme-dark">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[10px] text-theme-muted mt-2 tracking-wider font-light">
                * Prices include personalized atelier review and baseline styling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}