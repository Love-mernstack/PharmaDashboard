// src/components/EditMedicineModal.jsx
import React, { useState, useEffect } from "react";

const EditMedicineModal = ({ show, onClose, onUpdate, medicine }) => {
  const [formData, setFormData] = useState({ ...medicine });

  useEffect(() => {
    if (medicine) setFormData(medicine);
  }, [medicine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...formData, quantity: parseInt(formData.quantity), mrp: parseFloat(formData.mrp) });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-xl relative">
        <h3 className="text-2xl font-bold text-teal-700 mb-6">Edit Medicine</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Medicine Name" className="input" required />
          <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="input" />
          <input name="batchNo" value={formData.batchNo} onChange={handleChange} placeholder="Batch Number" className="input" />
          <input type="date" name="expiry" value={formData.expiry} onChange={handleChange} className="input" required />
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="input" required />
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="input" />
          <input name="supplier" value={formData.supplier} onChange={handleChange} placeholder="Supplier Name" className="input" />
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Storage Location" className="input" />
          <input type="number" name="mrp" value={formData.mrp} onChange={handleChange} placeholder="MRP (₹)" step="0.01" className="input" />

          <div className="col-span-full flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMedicineModal;
