import React, { useState } from "react";
import { Plus, Minus, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { PRODUCTS_LIST } from "../data/products";

export default function OrderSection() {
  const [formData, setFormData] = useState({ name: "", email: "", contactNumber: "" });
  const [selectedProductId, setSelectedProductId] = useState("");
  const [addQuantity, setAddQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Add Item to Order with Selected Quantity
  const handleAddItem = () => {
    if (!selectedProductId) return;
    const target = PRODUCTS_LIST.find((p) => p.id === selectedProductId);
    if (!target) return;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.productId === target.id);
      if (existing) {
        return prevCart.map((item) =>
          item.productId === target.id
            ? { ...item, quantity: item.quantity + addQuantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          productId: target.id,
          title: target.title,
          price: target.price,
          quantity: addQuantity,
        },
      ];
    });

    setSelectedProductId("");
    setAddQuantity(1);
  };

  // Update Quantity Directly from Order Summary (+ / - buttons)
  const handleUpdateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.productId === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.productId !== id));
  };

  const totalAmount = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!formData.name.trim() || !formData.email.trim() || !formData.contactNumber.trim()) {
      setStatus({ type: "error", message: "Name, email, and contact number are compulsory." });
      return;
    }

    if (cart.length === 0) {
      setStatus({ type: "error", message: "Please select and add at least one product." });
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
          message: "Thank you! Your custom crochet order inquiry has been received.",
        });
        setFormData({ name: "", email: "", contactNumber: "" });
        setCart([]);
      } else {
        setStatus({ type: "error", message: data.error || "Failed to submit your order." });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Could not connect to backend server. Make sure server is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="order" className="py-16 sm:py-24 bg-theme-lightBg border-t border-theme-border w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-theme-muted mb-2">Commissions</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-theme-dark italic font-normal">
            Place Your Custom Order
          </h2>
          <div className="w-12 h-[1px] bg-theme-border mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Compulsory Order Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full lg:col-span-7 bg-white p-6 sm:p-8 md:p-10 border border-theme-border shadow-sm space-y-5"
          >
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-theme-dark font-medium mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vishesh Srivastava"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#FAF8F5] border border-theme-border text-xs sm:text-sm focus:outline-none focus:border-theme-dark rounded-none placeholder:text-neutral-400 font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-theme-dark font-medium mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#FAF8F5] border border-theme-border text-xs sm:text-sm focus:outline-none focus:border-theme-dark rounded-none placeholder:text-neutral-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-theme-dark font-medium mb-1.5">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9876543210"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#FAF8F5] border border-theme-border text-xs sm:text-sm focus:outline-none focus:border-theme-dark rounded-none placeholder:text-neutral-400 font-sans"
                />
              </div>
            </div>

            {/* Product Dropdown with Quantity Stepper */}
            <div className="w-full">
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-theme-dark font-medium mb-1.5">
                Select Handcrafted Item <span className="text-red-500">*</span>
              </label>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                {/* Dropdown */}
                <div className="flex-1 min-w-0">
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#FAF8F5] border border-theme-border text-xs sm:text-sm focus:outline-none focus:border-theme-dark rounded-none text-theme-dark font-sans truncate"
                  >
                    <option value="">-- Choose a product --</option>
                    {PRODUCTS_LIST.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.title} — ₹{prod.price.toLocaleString("en-IN")}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Initial Quantity Selector */}
                <div className="flex items-center justify-between sm:justify-start border border-theme-border bg-[#FAF8F5] px-2 py-1 sm:py-0 shrink-0">
                  <span className="text-[10px] uppercase tracking-wider text-theme-muted sm:hidden">Qty</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAddQuantity((q) => Math.max(1, q - 1))}
                      className="p-1.5 text-theme-dark hover:bg-white transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">{addQuantity}</span>
                    <button
                      type="button"
                      onClick={() => setAddQuantity((q) => Math.min(20, q + 1))}
                      className="p-1.5 text-theme-dark hover:bg-white transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Add Button */}
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="w-full sm:w-auto px-5 py-2.5 sm:py-3 bg-theme-banner text-white text-[10px] sm:text-[11px] uppercase tracking-[0.2em] hover:bg-theme-dark transition-colors flex justify-center items-center gap-1 font-medium shrink-0"
                >
                  <Plus size={14} /> Add Item
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-4 bg-theme-dark text-white text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold hover:opacity-90 transition-opacity mt-2"
            >
              {loading ? "Processing Order..." : "Confirm & Send Order Inquiry"}
            </button>

            {status.message && (
              <div
                className={`p-3 sm:p-4 text-xs tracking-wider flex items-center gap-2 ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span className="text-[11px] sm:text-xs">{status.message}</span>
              </div>
            )}
          </form>

          {/* Dynamic Order Summary with Live Quantity Controls */}
          <div className="w-full lg:col-span-5 bg-white p-6 sm:p-8 md:p-10 border border-theme-border shadow-sm flex flex-col justify-between min-h-[380px]">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-theme-dark pb-3 sm:pb-4 border-b border-theme-border mb-4 sm:mb-6">
                Your Order Summary
              </h3>

              {cart.length === 0 ? (
                <div className="text-center py-12 sm:py-16 text-theme-muted italic text-xs font-light">
                  <p>No products added yet.</p>
                  <p className="mt-1">Pick items from the dropdown to see live calculated totals.</p>
                </div>
              ) : (
                <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between items-center text-xs border-b border-theme-border/60 pb-3"
                    >
                      <div className="pr-2 flex-1 min-w-0">
                        <p className="font-medium text-theme-dark truncate">{item.title}</p>
                        
                        {/* Summary Live Quantity Stepper */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex items-center border border-theme-border bg-[#FAF8F5] rounded-none">
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.productId, -1)}
                              className="px-1.5 py-0.5 text-theme-dark hover:bg-white transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-[11px] font-medium px-2 min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.productId, 1)}
                              className="px-1.5 py-0.5 text-theme-dark hover:bg-white transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          
                          <span className="text-[11px] text-theme-muted">
                            × ₹{item.price}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-medium text-theme-dark">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 sm:pt-6 border-t border-theme-border mt-6">
              <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] text-theme-dark font-medium">
                <span>Calculated Total</span>
                <span className="font-serif text-xl sm:text-2xl font-normal text-theme-dark">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}