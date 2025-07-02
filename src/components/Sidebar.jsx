// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ClipboardList,
  Users,
  Settings,
  RotateCcw,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: <Home size={20} />, path: "/" },
  { label: "Stocks", icon: <ClipboardList size={20} />, path: "/stocks" },
  { label: "POS", icon: <Users size={20} />, path: "/POS" },
  {
    label: "Customer Returns",
    icon: <RotateCcw size={20} />,
    path: "/customer-returns",
  },
  {
    label: "Purchase / Return",
    icon: <Settings size={20} />,
    path: "/purchase",
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r shadow-lg z-50 p-6">
      <h2 className="text-3xl font-bold mb-10 text-teal-600 tracking-tight">
        PharmaDash
      </h2>
      <nav className="flex flex-col gap-4">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors
                ${
                  isActive
                    ? "bg-teal-100 text-teal-700"
                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                }
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
