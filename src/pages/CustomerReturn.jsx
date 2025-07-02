import React, { useState, useEffect } from "react";
import { Search, CornerUpLeft, CheckCircle2 } from "lucide-react";

// Mock Data with batch and expiry date
const mockBills = [
  {
    id: "INV001",
    customer: "Amit Kumar",
    date: "2025-07-01",
    total: 520.0,
    items: [
      { id: 1, name: "Paracetamol", quantity: 2, price: 50, batch: "B123", expiry: "2026-01-01" },
      { id: 2, name: "Cough Syrup", quantity: 1, price: 120, batch: "C789", expiry: "2024-12-01" },
      { id: 3, name: "Insulin", quantity: 1, price: 300, batch: "I456", expiry: "2023-12-31" }, // expired
    ],
  },
  {
    id: "INV002",
    customer: "Sneha Sharma",
    date: "2025-07-02",
    total: 300.0,
    items: [
      { id: 4, name: "Amoxicillin", quantity: 3, price: 100, batch: "A888", expiry: "2025-09-01" },
    ],
  },
];

const CustomerReturns = () => {
  const [query, setQuery] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const [returnReason, setReturnReason] = useState("");
  const [returnQuantities, setReturnQuantities] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [returnedItems, setReturnedItems] = useState([]);

  // Auto search invoice
  useEffect(() => {
    if (query.trim().length >= 6) {
      const bill = mockBills.find((bill) => bill.id === query.trim().toUpperCase());
      setSelectedBill(bill || null);
      setReturnQuantities({});
      setIsSubmitted(false);
      setReturnedItems([]);
    }
  }, [query]);

  const handleReturnQtyChange = (itemId, value, max) => {
    if (value < 0 || value > max) return;
    setReturnQuantities((prev) => ({ ...prev, [itemId]: value }));
  };

  const isExpired = (expiryDate) => {
    const today = new Date();
    return new Date(expiryDate) < today;
  };

  const handleReturnSubmit = () => {
    if (!returnReason.trim()) return;

    const anyReturn = Object.values(returnQuantities).some((q) => q > 0);
    if (!anyReturn) return alert("Enter return quantity for at least one item.");

    const returned = selectedBill.items
      .filter((item) => returnQuantities[item.id] > 0 && !isExpired(item.expiry))
      .map((item) => ({
        ...item,
        returnQty: returnQuantities[item.id],
        returnAmount: item.price * returnQuantities[item.id],
      }));

    setReturnedItems(returned);
    setIsSubmitted(true);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-800 font-sans">
      <h2 className="text-4xl font-bold mb-2 flex items-center gap-3 text-gray-900">
        <CornerUpLeft className="text-teal-600" size={30} />
        Customer Returns
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Search invoice by bill reference number to initiate a return.
      </p>

      {/* Search Input */}
      <div className="relative max-w-md mb-8">
        <input
          type="text"
          placeholder="Enter Bill Reference (e.g., INV001)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm text-lg focus:ring-2 focus:ring-teal-500"
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
      </div>

      {/* Invoice Detail */}
      {selectedBill ? (
        <div className="bg-white border rounded-lg shadow-lg p-6 mb-10">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-2xl font-semibold text-teal-700 mb-1">Invoice: {selectedBill.id}</h3>
              <p className="text-gray-700">Customer: <strong>{selectedBill.customer}</strong></p>
              <p className="text-gray-700">Date: {selectedBill.date}</p>
            </div>
            <div className="text-xl font-bold text-gray-800">
              Total: ₹{selectedBill.total.toFixed(2)}
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-center border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr className="text-gray-700 font-medium">
                  <th className="px-4 py-2 text-left">Item</th>
                  <th className="px-4 py-2">Batch</th>
                  <th className="px-4 py-2">Expiry</th>
                  <th className="px-4 py-2">Qty</th>
                  <th className="px-4 py-2">Return Qty</th>
                </tr>
              </thead>
              <tbody>
                {selectedBill.items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2 text-left">{item.name}</td>
                    <td className="px-4 py-2">{item.batch}</td>
                    <td className="px-4 py-2">
                      {isExpired(item.expiry) ? (
                        <span className="text-red-600 font-semibold">Expired</span>
                      ) : (
                        item.expiry
                      )}
                    </td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min={0}
                        max={item.quantity}
                        value={returnQuantities[item.id] || ""}
                        disabled={isExpired(item.expiry)}
                        onChange={(e) =>
                          handleReturnQtyChange(
                            item.id,
                            parseInt(e.target.value) || 0,
                            item.quantity
                          )
                        }
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md text-center disabled:bg-gray-100"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reason Input */}
          <textarea
            value={returnReason}
            onChange={(e) => setReturnReason(e.target.value)}
            placeholder="Enter reason for return..."
            className="w-full border border-gray-300 rounded-md p-3 text-lg focus:ring-2 focus:ring-teal-500 mb-4"
            rows={4}
          />

          {/* Submit Button */}
          {!isSubmitted ? (
            <button
              onClick={handleReturnSubmit}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md text-lg transition"
            >
              Submit Return Request
            </button>
          ) : (
            <div className="flex items-center gap-2 text-green-600 font-semibold text-lg mb-4">
              <CheckCircle2 size={22} />
              Return request submitted successfully!
            </div>
          )}
        </div>
      ) : (
        query && (
          <div className="text-red-600 font-medium text-lg">Invoice not found. Please try again.</div>
        )
      )}

      {/* Return Summary */}
      {isSubmitted && returnedItems.length > 0 && (
        <div className="bg-white border rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Return Summary</h3>
          <table className="min-w-full border border-gray-200 rounded-md text-center">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Item</th>
                <th className="px-4 py-2">Return Qty</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {returnedItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2 text-left">{item.name}</td>
                  <td className="px-4 py-2">{item.returnQty}</td>
                  <td className="px-4 py-2">₹{item.returnAmount.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="border-t font-bold text-lg">
                <td className="px-4 py-2 text-right" colSpan={2}>Total Refund:</td>
                <td className="px-4 py-2">
                  ₹{returnedItems.reduce((acc, item) => acc + item.returnAmount, 0).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerReturns;
