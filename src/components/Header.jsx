import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="fixed top-0 left-64 right-0 z-40 h-20 px-6 flex items-center justify-between bg-white border-b shadow-sm">
      {/* Left Side: Brand and Page Title */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-teal-700">PharmaDash</h1>
        <span className="text-sm text-gray-500">Pharmacy Management System</span>
      </div>

      {/* Center: Date and Time */}
      <div className="hidden md:block text-gray-700 text-sm font-medium">
        <span>{formattedTime}</span>
      </div>

      {/* Right Side: Notifications and Profile */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <Bell className="text-gray-600 hover:text-teal-600 transition" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
            3
          </span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">Dr. Love</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-gray-200"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
