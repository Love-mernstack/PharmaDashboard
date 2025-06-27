import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const medicines = [
  { id: 1, name: "Paracetamol", price: 50 },
  { id: 2, name: "Amoxicillin", price: 80 },
  { id: 3, name: "Cough Syrup", price: 120 },
  { id: 4, name: "Insulin", price: 250 },
];

const Return = () => {
  const [entries, setEntries] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");

  const addEntry = () => {
    const med = medicines.find((m) => m.id === parseInt(selectedId));
    if (med && quantity > 0 && reason.trim()) {
      setEntries([
        ...entries,
        {
          ...med,
          quantity,
          reason,
          total: med.price * quantity,
        },
      ]);
      setSelectedId("");
      setQuantity(1);
      setReason("");
    }
  };

  const removeEntry = (i) => {
    const updated = [...entries];
    updated.splice(i, 1);
    setEntries(updated);
  };

  const totalReturn = entries.reduce((acc, e) => acc + e.total, 0);

  return (
    <div>
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Add Return Entry</h3>
        <div className="grid sm:grid-cols-4 gap-4">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option value="">Select Medicine</option>
            {medicines.map((med) => (
              <option key={med.id} value={med.id}>
                {med.name} - ₹{med.price}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
            min={1}
            className="border px-3 py-2 rounded-md"
            placeholder="Quantity"
          />

          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason"
            className="border px-3 py-2 rounded-md"
          />

          <button
            onClick={addEntry}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            <Plus size={16} className="inline-block mr-1" />
            Add Return
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-auto border mb-6">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Medicine</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Quantity</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Reason</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-3">{entry.name}</td>
                <td className="px-6 py-3">{entry.quantity}</td>
                <td className="px-6 py-3">₹{entry.price}</td>
                <td className="px-6 py-3">{entry.reason}</td>
                <td className="px-6 py-3">₹{entry.total}</td>
                <td className="px-6 py-3 text-right">
                  <button onClick={() => removeEntry(i)}>
                    <Trash2 className="text-red-500 hover:text-red-700" size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-5 text-center text-gray-500">No returns added</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="text-right text-lg font-semibold text-gray-800">
        Total Return: ₹{totalReturn}
      </div>
    </div>
  );
};

export default Return;
