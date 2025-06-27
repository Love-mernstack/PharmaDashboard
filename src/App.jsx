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
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/" */}
          <Route path="/stocks" element={<Stock/>}/>
          <Route path="/POS" element={<POS/>}/>
          <Route path="/purchase" element={<PurchaseReturn/>}/>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
