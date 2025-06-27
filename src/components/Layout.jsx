// src/components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64 min-h-screen bg-gray-100 overflow-hidden">
        <Header />
        <main className="p-6 h-full overflow-auto pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
