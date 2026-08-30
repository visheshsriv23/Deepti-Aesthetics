import React, { useState, useEffect } from "react";
import { LogOut, RefreshCw, ChevronLeft, ChevronRight, Package, Clock } from "lucide-react";

export default function AdminVishesh() {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("deepti_admin_jwt") || "",
    isLoggedIn: !!localStorage.getItem("deepti_admin_jwt"),
  });
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  // Pagination Configuration: 10 Orders per page
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const totalPages = Math.ceil(orders.length / ordersPerPage) || 1;
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + ordersPerPage);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("deepti_admin_jwt", data.token);
        setAuth({ token: data.token, isLoggedIn: true });
      } else {
        setError(data.error || "Invalid login credentials.");
      }
    } catch {
      setError("Unable to connect to backend server. Make sure server is running.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders || []);
      } else {
        if (res.status === 401 || res.status === 403) handleLogout();
      }
    } catch (err) {
      console.error("Order fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Update order state locally
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        alert(data.error || "Failed to update status.");
      }
    } catch {
      alert("Network error. Could not update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      fetchOrders();
    }
  }, [auth.isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("deepti_admin_jwt");
    setAuth({ token: "", isLoggedIn: false });
  };

  // Status Badge Styling Helper
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-800 border-emerald-300";
      case "Processing":
        return "bg-blue-50 text-blue-800 border-blue-300";
      case "Pending":
      default:
        return "bg-amber-50 text-amber-800 border-amber-300";
    }
  };

  if (!auth.isLoggedIn) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 border border-theme-border shadow-sm">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-theme-muted">Restricted Console</span>
            <h1 className="text-3xl font-serif text-theme-dark mt-1">Admin Portal</h1>
            <p className="text-xs text-theme-muted mt-1 font-light">Deepti Aesthetics Studio Desk</p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-xs text-center font-sans">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-theme-dark font-medium mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={credentials.email}
                placeholder="abc@gmail.com"
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-theme-border text-xs sm:text-sm focus:outline-none focus:border-theme-dark font-sans"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-theme-dark font-medium mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={credentials.password}
                placeholder="••••••••••••"
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-theme-border text-xs sm:text-sm focus:outline-none focus:border-theme-dark font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-theme-dark text-white text-[10px] sm:text-[11px] uppercase tracking-[0.25em] hover:opacity-90 transition-opacity font-semibold mt-2"
            >
              {loading ? "Verifying..." : "Login to Console"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg p-4 sm:p-8 md:p-12 font-sans text-theme-dark">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-theme-border gap-4 mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-theme-muted">Order Management</span>
            <h1 className="text-2xl sm:text-3xl font-serif text-theme-dark">
              Customer Inquiries ({orders.length} Total)
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="px-4 py-2 bg-white border border-theme-border text-xs uppercase tracking-wider text-theme-dark hover:bg-neutral-50 flex items-center gap-2 transition-colors"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-theme-dark text-white text-xs uppercase tracking-wider hover:opacity-90 flex items-center gap-2 transition-opacity"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </header>

        {/* Orders Table Container */}
        <div className="bg-white border border-theme-border shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F2EDE4] text-[10px] uppercase tracking-[0.2em] text-theme-dark border-b border-theme-border font-medium">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Ordered Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Received Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/60">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-theme-muted italic">
                    <Package size={24} className="mx-auto mb-2 text-theme-border" />
                    No customer orders placed yet.
                  </td>
                </tr>
              ) : (
                currentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-[#FCFAF7] transition-colors">
                    <td className="p-4 font-medium text-theme-dark align-top">
                      {order.name}
                    </td>
                    <td className="p-4 text-theme-muted leading-relaxed align-top">
                      <div className="text-theme-dark">{order.email}</div>
                      <div>{order.contactNumber}</div>
                    </td>
                    <td className="p-4 align-top space-y-1">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="text-theme-dark">
                          • {item.title} <span className="text-theme-muted font-light">(Qty: {item.quantity})</span>
                        </div>
                      ))}
                    </td>
                    <td className="p-4 font-serif text-base font-semibold text-theme-dark align-top">
                      ₹{order.totalAmount?.toLocaleString("en-IN")}
                    </td>
                    
                    {/* Interactive Status Selector */}
                    <td className="p-4 align-top">
                      <select
                        value={order.status || "Pending"}
                        disabled={updatingId === order._id}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 border rounded-sm outline-none cursor-pointer ${getStatusBadgeClass(
                          order.status || "Pending"
                        )} ${updatingId === order._id ? "opacity-50" : ""}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    <td className="p-4 text-theme-muted align-top whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 10-Item Pagination Bottom Bar */}
        {orders.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 text-xs text-theme-muted">
            <span>
              Showing <strong className="text-theme-dark">{startIndex + 1}</strong> to{" "}
              <strong className="text-theme-dark">
                {Math.min(startIndex + ordersPerPage, orders.length)}
              </strong>{" "}
              of <strong className="text-theme-dark">{orders.length}</strong> orders
            </span>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-theme-border bg-white text-theme-dark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`w-8 h-8 text-xs font-serif transition-colors ${
                      currentPage === num
                        ? "bg-theme-dark text-white font-semibold"
                        : "bg-white border border-theme-border text-theme-dark hover:bg-[#F2EDE4]"
                    }`}
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-theme-border bg-white text-theme-dark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}