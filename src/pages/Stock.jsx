import React, { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";

const stockData = [
  { id: 1, name: "Paracetamol", quantity: 120, expiry: "2025-05-20", category: "Painkiller", status: "In Stock" },
  { id: 2, name: "Amoxicillin", quantity: 8, expiry: "2024-12-10", category: "Antibiotic", status: "Low Stock" },
  { id: 3, name: "Insulin", quantity: 0, expiry: "2024-09-01", category: "Diabetic", status: "Out of Stock" },
  { id: 4, name: "Cough Syrup", quantity: 55, expiry: "2023-12-01", category: "Cold/Flu", status: "Expired" },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800";
    case "Low Stock":
      return "bg-yellow-100 text-yellow-800";
    case "Out of Stock":
      return "bg-red-100 text-red-800";
    case "Expired":
      return "bg-gray-300 text-gray-700 line-through";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Stock = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredData = stockData.filter((item) => {
    const matchQuery = item.name.toLowerCase().includes(query.toLowerCase());
    const matchFilter = filter === "All" || item.status === filter;
    return matchQuery && matchFilter;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-1">📦 Stock Management</h2>
        <p className="text-gray-500">Monitor stock levels, expiry, and availability with real-time data filtering.</p>
      </div>

      {/* Search + Filter + Add */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search medicine..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-40 border border-gray-300 rounded-lg py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="All">All Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Expired">Expired</option>
        </select>

        {/* Add Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
          <Plus size={16} />
          Add Medicine
        </button>
      </div>

      {/* Stock Table */}
      <div className="overflow-hidden bg-white shadow-xl ring-1 ring-gray-200 rounded-2xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Medicine</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Quantity</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Expiry Date</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-all duration-200 ease-in-out">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">{item.expiry}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-blue-600 hover:underline text-sm font-medium">Edit</button>
                    <button className="text-red-600 hover:underline text-sm font-medium">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-6 py-10 text-gray-500">
                  No matching medicines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stock;
