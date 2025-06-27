// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import POS from "./pages/POS";
import PurchaseReturn from "./pages/PurchaseReturn";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stocks" element={<Stock />} />
          <Route path="/POS" element={<POS />} />
          <Route path="/purchase" element={<PurchaseReturn />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
