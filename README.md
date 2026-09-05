# Deepti Aesthetics 🧶✨

A full-stack, bespoke web platform and ordering system for Deepti Aesthetics—specializing in handcrafted crochet goods, forever florals, amigurumi charms, and custom commissions.

---

## 🌟 Key Features

* Editorial Catalog: Clean, responsive product gallery with 4-item pagination.
* Dynamic Custom Order Builder:
  - Dropdown synced with studio catalog.
  - Live quantity increment/decrement controls.
  - Real-time total price calculation.
  - Client-side validation for required contact and order details.
* Admin Dashboard:
  - Protected JWT authentication.
  - Complete order overview with customer details and itemized breakdowns.
  - Status updater (Pending, Processing, Completed) with instant badge feedback.
  - 10 orders per page pagination.
* Mobile-First Aesthetic: Editorial typography, neutral color palette, and smooth layout responsiveness.

---

## 🛠️ Tech Stack

* Frontend: React 18, Vite, Tailwind CSS, Lucide React, React Router
* Backend: Node.js, Express.js (ES Modules)
* Database: MongoDB & Mongoose
* Authentication: JSON Web Tokens (JWT)
* Hosting: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

---

## 📁 Project Structure

deepti-aesthetics/
├── backend/
│   ├── models/Order.js
│   ├── routes/orderRoutes.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── products/              # Product image assets
    ├── src/
    │   ├── components/        # Navbar, Hero, Catalog, OrderSection, Contact
    │   ├── data/products.js   # Shared catalog data & image imports
    │   ├── pages/             # Storefront & Admin pages
    │   └── App.jsx
    ├── vercel.json            # Client-side SPA routing rules
    ├── vite.config.js
    └── package.json

---

## 🚀 Setup & Installation

### 1. Backend Setup

cd backend
npm install

Create backend/.env:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_token
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

Start the server:
npm run dev

### 2. Frontend Setup

cd frontend
npm install

Create frontend/.env:
VITE_API_URL=http://localhost:5000

Start the Vite development server:
npm run dev

---

## 📡 API Overview

* POST /api/orders — Submit a new customer inquiry / custom order.
* POST /api/admin/login — Authenticate admin credentials and generate token.
* GET /api/admin/orders — Retrieve all received orders (Protected).
* PATCH /api/admin/orders/:id/status — Update order progress status (Protected).

---

## 🌐 Deployment Notes

* Frontend (Vercel): Set Root Directory to "frontend". Ensure vercel.json rewrite rule is included for client-side routing.
* Backend (Render): Set Root Directory to "backend", Build Command to "npm install", and Start Command to "node server.js".
* Set VITE_API_URL on Vercel to your deployed Render URL.
