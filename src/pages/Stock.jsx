// src/pages/Stock.jsx
import React, { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import AddMedicineModal from "../components/AddMedicineModal";
import EditMedicineModal from "../components/EditMedicineModal";

const initialStockData = [
  {
    id: 1,
    name: "Paracetamol",
    brand: "Cipla",
    batchNo: "B001",
    quantity: 120,
    expiry: "2025-05-20",
    category: "Painkiller",
    supplier: "HealthCare Distributors",
    location: "Shelf A1",
    mrp: 25,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Amoxicillin",
    brand: "Sun Pharma",
    batchNo: "B002",
    quantity: 8,
    expiry: "2024-12-10",
    category: "Antibiotic",
    supplier: "Prime Medics",
    location: "Shelf B2",
    mrp: 42,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Ibuprofen",
    brand: "Dr. Reddy's",
    batchNo: "B003",
    quantity: 0,
    expiry: "2023-09-15",
    category: "Anti-inflammatory",
    supplier: "MediSupply Co.",
    location: "Shelf C3",
    mrp: 30,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Cetirizine",
    brand: "Zydus",
    batchNo: "B004",
    quantity: 5,
    expiry: "2024-11-01",
    category: "Antihistamine",
    supplier: "Quick Pharma",
    location: "Shelf D1",
    mrp: 18,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Metformin",
    brand: "Glenmark",
    batchNo: "B005",
    quantity: 70,
    expiry: "2026-03-10",
    category: "Diabetes",
    supplier: "HealthCare Distributors",
    location: "Shelf A2",
    mrp: 35,
    status: "In Stock",
  },
  {
    id: 6,
    name: "Omeprazole",
    brand: "Torrent Pharma",
    batchNo: "B006",
    quantity: 60,
    expiry: "2025-01-05",
    category: "Gastric",
    supplier: "Quick Pharma",
    location: "Shelf F1",
    mrp: 22,
    status: "In Stock",
  },
  {
    id: 7,
    name: "Azithromycin",
    brand: "Alkem",
    batchNo: "B007",
    quantity: 15,
    expiry: "2024-08-18",
    category: "Antibiotic",
    supplier: "Prime Medics",
    location: "Shelf B1",
    mrp: 65,
    status: "In Stock",
  },
  {
    id: 8,
    name: "Losartan",
    brand: "Lupin",
    batchNo: "B008",
    quantity: 0,
    expiry: "2023-12-01",
    category: "Hypertension",
    supplier: "MediSupply Co.",
    location: "Shelf E2",
    mrp: 40,
    status: "Out of Stock",
  },
  {
    id: 9,
    name: "Vitamin D3",
    brand: "Abbott",
    batchNo: "B009",
    quantity: 25,
    expiry: "2025-09-25",
    category: "Supplements",
    supplier: "NutriLife Supplies",
    location: "Shelf G1",
    mrp: 50,
    status: "In Stock",
  },
  {
    id: 10,
    name: "Levothyroxine",
    brand: "Mankind",
    batchNo: "B010",
    quantity: 9,
    expiry: "2024-07-14",
    category: "Thyroid",
    supplier: "MediSupply Co.",
    location: "Shelf H2",
    mrp: 28,
    status: "Low Stock",
  },
  {
    id: 11,
    name: "Aspirin",
    brand: "Bayer",
    batchNo: "B011",
    quantity: 14,
    expiry: "2026-01-10",
    category: "Blood Thinner",
    supplier: "Quick Pharma",
    location: "Shelf C1",
    mrp: 12,
    status: "In Stock",
  },
  {
    id: 12,
    name: "Insulin",
    brand: "Novo Nordisk",
    batchNo: "B012",
    quantity: 4,
    expiry: "2024-10-20",
    category: "Diabetes",
    supplier: "Prime Medics",
    location: "Fridge",
    mrp: 110,
    status: "Low Stock",
  },
  {
    id: 13,
    name: "Calcium Tablets",
    brand: "Himalaya",
    batchNo: "B013",
    quantity: 33,
    expiry: "2025-06-30",
    category: "Supplements",
    supplier: "NutriLife Supplies",
    location: "Shelf G2",
    mrp: 45,
    status: "In Stock",
  },
  {
    id: 14,
    name: "Ranitidine",
    brand: "Sun Pharma",
    batchNo: "B014",
    quantity: 0,
    expiry: "2023-08-01",
    category: "Gastric",
    supplier: "HealthCare Distributors",
    location: "Shelf F2",
    mrp: 20,
    status: "Expired",
  },
  {
    id: 15,
    name: "Multivitamin Syrup",
    brand: "Zandu",
    batchNo: "B015",
    quantity: 12,
    expiry: "2025-02-15",
    category: "Supplements",
    supplier: "Quick Pharma",
    location: "Shelf G3",
    mrp: 55,
    status: "In Stock",
  },
  {
    id: 16,
    name: "Chlorpheniramine",
    brand: "Alkem",
    batchNo: "B016",
    quantity: 5,
    expiry: "2024-11-25",
    category: "Cold & Allergy",
    supplier: "Prime Medics",
    location: "Shelf D3",
    mrp: 18,
    status: "Low Stock",
  },
  {
    id: 17,
    name: "Hydroxychloroquine",
    brand: "Ipca",
    batchNo: "B017",
    quantity: 60,
    expiry: "2026-05-05",
    category: "Malaria",
    supplier: "HealthCare Distributors",
    location: "Shelf E4",
    mrp: 35,
    status: "In Stock",
  },
  {
    id: 18,
    name: "Domperidone",
    brand: "Torrent",
    batchNo: "B018",
    quantity: 3,
    expiry: "2024-12-20",
    category: "Digestive",
    supplier: "MediSupply Co.",
    location: "Shelf F3",
    mrp: 22,
    status: "Low Stock",
  },
  {
    id: 19,
    name: "Pantoprazole",
    brand: "Lupin",
    batchNo: "B019",
    quantity: 100,
    expiry: "2025-04-10",
    category: "Gastric",
    supplier: "Quick Pharma",
    location: "Shelf F5",
    mrp: 25,
    status: "In Stock",
  },
  {
    id: 20,
    name: "Cefixime",
    brand: "Cipla",
    batchNo: "B020",
    quantity: 6,
    expiry: "2024-09-30",
    category: "Antibiotic",
    supplier: "Prime Medics",
    location: "Shelf B5",
    mrp: 60,
    status: "Low Stock",
  },
];


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
  const [stockData, setStockData] = useState(initialStockData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
        ? { ...updatedMedicine, status: getStatus(updatedMedicine.quantity, updatedMedicine.expiry) }
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
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = filterStatus === "All" || item.status === filterStatus;
    return matchesQuery && matchesStatus;
  });

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 min-h-screen flex flex-col">
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-1">📦 Stock Management</h2>
        <p className="text-gray-500">Monitor and manage medicines efficiently.</p>
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
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(item.status)}`}>
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

      <AddMedicineModal show={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAdd} />
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