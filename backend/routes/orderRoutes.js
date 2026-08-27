import express from "express";
import jwt from "jsonwebtoken";
import Order from "../models/Order.js";

const router = express.Router();

const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "deepti_aesthetics_secure_jwt_token_2026"
    );
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

router.post("/orders", async (req, res) => {
  try {
    const { name, email, contactNumber, items, totalAmount } = req.body;

    // Strict validation
    if (!name || !email || !contactNumber || !items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ error: "All fields and products are compulsory." });
    }

    const newOrder = await Order.create({
      name,
      email,
      contactNumber,
      items,
      totalAmount,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order: newOrder,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Failed to create order." });
  }
});

router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || "tanishkasrivastava57@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "tanishka+deepti";

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign(
      { email, role: "admin" },
      process.env.JWT_SECRET || "deepti_aesthetics_secure_jwt_token_2026",
      { expiresIn: "24h" }
    );
    return res.json({ success: true, token });
  }

  return res.status(401).json({ error: "Invalid admin credentials." });
});

router.get("/admin/orders", verifyAdminToken, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json({ success: true, orders });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch orders." });
  }
});

export default router;