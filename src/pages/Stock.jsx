// src/pages/Stock.jsx
import React, { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import axios from "axios";
import AddMedicineModal from "../components/AddMedicineModal";
import EditMedicineModal from "../components/EditMedicineModal";

const getStatus = (qty, expiry) => {
  const isExpired = new Date(expiry) < new Date();
  if (isExpired) return "Expired";
  if (qty === 0) return "Out of Stock";
  if (qty < 10) return "Low Stock";
  return "In Stock";
};

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
  const [stockData, setStockData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await axios.get(
          `https://codigoaldea1.pythonanywhere.com/api/stocks?page=${currentPage}`
        );

        const formatted = res.data.stocks.map((item) => {
          const purchase = item.last_purchase;
          return {
            id: item.id,
            name: purchase?.medicine_name?.name || "-",
            brand: purchase?.medicine_name?.manufacturer?.manufac_name || "-",
            batchNo: purchase?.batch_id || "-",
            quantity: item.quantity || 0,
            expiry: purchase?.expiry || "-",
            category: "-", // Not available in API
            supplier: purchase?.supplier?.name || "-",
            location: "-", // Not available in API
            mrp: purchase?.tabs_sp || 0,
            status: getStatus(item.quantity || 0, purchase?.expiry),
          };
        });

        setStockData(formatted);
        setTotalCount(res.data.stocks_count_all || formatted.length);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, [currentPage]);

  const handleDelete = (id) => {
    setStockData(stockData.filter((item) => item.id !== id));
  };

  const handleAdd = (medicine) => {
    const newItem = {
      ...medicine,
      id: Date.now(),
      status: getStatus(medicine.quantity, medicine.expiry),
    };
    setStockData([newItem, ...stockData]);
    setShowAddModal(false);
  };

  const handleUpdate = (updatedMedicine) => {
    const updatedList = stockData.map((item) =>
      item.id === updatedMedicine.id
        ? {
            ...updatedMedicine,
            status: getStatus(
              updatedMedicine.quantity,
              updatedMedicine.expiry
            ),
          }
        : item
    );
    setStockData(updatedList);
    setShowEditModal(false);
  };

  const handleEdit = (medicine) => {
    setEditItem(medicine);
    setShowEditModal(true);
  };

  const filteredData = stockData.filter((item) => {
    const matchesQuery = item.name
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesStatus = filterStatus === "All" || item.status === filterStatus;
    return matchesQuery && matchesStatus;
  });

  const pageCount = Math.ceil(totalCount / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 min-h-screen flex flex-col">
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-1">
          📦 Stock Management
        </h2>
        <p className="text-gray-500">
          Monitor and manage medicines efficiently.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search medicine..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 shadow-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="All">All</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Expired">Expired</option>
        </select>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          <Plus size={16} /> Add Medicine
        </button>
      </div>

      <div className="overflow-hidden bg-white shadow-xl ring-1 ring-gray-200 rounded-2xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Brand</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Batch No</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Expiry</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Qty</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Supplier</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">MRP</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-sm">{item.brand}</td>
                  <td className="px-6 py-4 text-sm">{item.batchNo}</td>
                  <td className="px-6 py-4 text-sm">{item.expiry}</td>
                  <td className="px-6 py-4 text-sm">{item.quantity}</td>
                  <td className="px-6 py-4 text-sm">{item.category}</td>
                  <td className="px-6 py-4 text-sm">{item.supplier}</td>
                  <td className="px-6 py-4 text-sm">{item.location}</td>
                  <td className="px-6 py-4 text-sm">₹{item.mrp}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:underline text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="px-6 py-10 text-center text-gray-500">
                  No matching medicines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white py-3 shadow-inner flex justify-center z-50 gap-2">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded-md text-sm mx-1 transition-colors duration-200 font-medium ${
              currentPage === page
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <AddMedicineModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAdd}
      />
      <EditMedicineModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdate={handleUpdate}
        medicine={editItem || {}}
      />
    </div>
  );
};

export default Stock;
