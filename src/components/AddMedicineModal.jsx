// src/components/AddMedicineModal.jsx
import React, { useState } from "react";
import { X } from "lucide-react";

const AddMedicineModal = ({ show, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    batchNo: "",
    expiry: "",
    quantity: "",
    category: "",
    supplier: "",
    location: "",
    mrp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.expiry || !formData.quantity) return;
    onAdd({ ...formData, quantity: parseInt(formData.quantity), mrp: parseFloat(formData.mrp) });
    setFormData({
      name: "",
      brand: "",
      batchNo: "",
      expiry: "",
      quantity: "",
      category: "",
      supplier: "",
      location: "",
      mrp: "",
    });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-8 relative animate-fadeInUp">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-teal-600 transition"
        >
          <X size={20} />
        </button>

        <h3 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-3">➕ Add New Medicine</h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Medicine Name*</label>
            <input name="name" value={formData.name} onChange={handleChange} className="input" required />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Brand</label>
            <input name="brand" value={formData.brand} onChange={handleChange} className="input" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Batch Number</label>
            <input name="batchNo" value={formData.batchNo} onChange={handleChange} className="input" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Expiry Date*</label>
            <input type="date" name="expiry" value={formData.expiry} onChange={handleChange} className="input" required />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Quantity*</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="input" required />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Category</label>
            <input name="category" value={formData.category} onChange={handleChange} className="input" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Supplier</label>
            <input name="supplier" value={formData.supplier} onChange={handleChange} className="input" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Storage Location</label>
            <input name="location" value={formData.location} onChange={handleChange} className="input" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">MRP (₹)</label>
            <input type="number" name="mrp" value={formData.mrp} onChange={handleChange} step="0.01" className="input" />
          </div>

          <div className="col-span-full flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 shadow-sm transition"
            >
              Add Medicine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineModal;

// Tailwind 'input' class styling suggestion:
// .input {
//   @apply w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm;
// }
// Add animation classes to Tailwind config or global CSS:
// .animate-fadeInUp {
//   animation: fadeInUp 0.3s ease-out both;
// }
// @keyframes fadeInUp {
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }