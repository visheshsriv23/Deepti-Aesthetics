import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminVishesh from "./pages/AdminVishesh";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/vishesh" element={<AdminVishesh />} />
      </Routes>
    </BrowserRouter>
  );
}