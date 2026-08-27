import React, { useState, useEffect } from "react";
import { LogOut, RefreshCw, Eye } from "lucide-react";

export default function AdminVishesh() {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("deepti_admin_jwt") || "",
    isLoggedIn: !!localStorage.getItem("deepti_admin_jwt"),
  });
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
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
      setError("Unable to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/orders", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders || []);
      } else {
        if (res.status === 401 || res.status === 403) handleLogout();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.isLoggedIn) fetchOrders();
  }, [auth.isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("deepti_admin_jwt");
    setAuth({ token: "", isLoggedIn: false });
  };

  // If Not Logged In: Show Admin Login Box
  if (!auth.isLoggedIn) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white p-10 border border-theme-border shadow-sm">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-theme-muted">Restricted Access</span>
            <h1 className="text-3xl font-serif text-theme-dark mt-1">Admin Portal</h1>
            <p className="text-xs text-theme-muted mt-1 font-light">Deepti Aesthetics Studio Desk</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] text-theme-dark mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={credentials.email}
                placeholder="tanishkasrivastava57@gmail.com"
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-theme-border text-sm focus:outline-none focus:border-theme-dark"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] text-theme-dark mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={credentials.password}
                placeholder="••••••••••••"
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-theme-border text-sm focus:outline-none focus:border-theme-dark"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-theme-dark text-white text-[11px] uppercase tracking-[0.25em] hover:opacity-90 transition-opacity font-semibold"
            >
              {loading ? "Verifying..." : "Login to Console"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard View
  return (
    <div className="min-h-screen bg-theme-bg p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-theme-border gap-4 mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-theme-muted">Management View</span>
            <h1 className="text-3xl font-serif text-theme-dark">Customer Inquiries & Orders</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="px-4 py-2 bg-white border border-theme-border text-xs uppercase tracking-wider text-theme-dark hover:bg-neutral-50 flex items-center gap-2"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-theme-dark text-white text-xs uppercase tracking-wider hover:opacity-90 flex items-center gap-2"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </header>

        {/* Order Details Table */}
        <div className="bg-white border border-theme-border shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F2EDE4] text-[10px] uppercase tracking-[0.2em] text-theme-dark border-b border-theme-border">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4">Products Selected</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/60">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-theme-muted italic">
                    No orders registered yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-[#FCFAF7] transition-colors">
                    <td className="p-4 font-medium text-theme-dark">{order.name}</td>
                    <td className="p-4 text-theme-muted leading-relaxed">
                      <div>Email:{order.email}</div>
                      <br></br>
                      <br></br>
                      <div>Number:{order.contactNumber}</div>
                    </td>
                    <td className="p-4">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="text-theme-dark">
                          • {item.title} <span className="text-theme-muted">(Qty: {item.quantity})</span>
                        </div>
                      ))}
                    </td>
                    <td className="p-4 font-serif text-base text-theme-dark font-medium">
                      ₹{order.totalAmount?.toLocaleString("en-IN")}
                    </td>
                    <td className="p-4 text-theme-muted">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}