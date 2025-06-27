import React, { useState } from "react";
import { Search, Trash2, X } from "lucide-react";

const medicines = [
  { id: 1, name: "Paracetamol", price: 50 },
  { id: 2, name: "Amoxicillin", price: 80 },
  { id: 3, name: "Cough Syrup", price: 120 },
  { id: 4, name: "Insulin", price: 250 },
];

const POS = () => {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);

  const addToCart = (med) => {
    const exists = cart.find((item) => item.id === med.id);
    if (exists) {
      setCart(cart.map((item) =>
        item.id === med.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...med, quantity: 1 }]);
    }
    setQuery("");
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart(cart.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = +(subtotal * 0.05).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const filteredMeds = medicines.filter((med) =>
    med.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleBilling = () => {
    if (cart.length === 0) return alert("Cart is empty!");
    setShowReceipt(true);
  };

  const resetOrder = () => {
    setCart([]);
    setShowReceipt(false);
  };

  const currentDateTime = new Date().toLocaleString();

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-gray-900 mb-2">💳 Point of Sale</h2>
      <p className="text-gray-500 mb-6">Touch-friendly billing interface for counters.</p>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <input
          type="text"
          placeholder="Search medicine..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        {query && filteredMeds.length > 0 && (
          <ul className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-md max-h-56 overflow-auto">
            {filteredMeds.map((med) => (
              <li
                key={med.id}
                onClick={() => addToCart(med)}
                className="px-4 py-2 cursor-pointer hover:bg-teal-50"
              >
                {med.name} - ₹{med.price}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-2xl border overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Medicine</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Price</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Qty</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Total</th>
                <th className="px-6 py-3 text-right font-semibold text-gray-700">Remove</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4">₹{item.price}</td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => updateQty(item.id, +e.target.value)}
                      className="w-20 px-2 py-2 border border-gray-300 rounded-md text-center text-lg"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold">₹{item.price * item.quantity}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={20} className="text-red-500 hover:text-red-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {cart.length === 0 && (
            <div className="p-6 text-center text-gray-500 text-lg">No items in cart.</div>
          )}
        </div>

        {/* Billing Summary */}
        <div className="bg-white border rounded-2xl p-6 shadow-md sticky top-6 h-fit">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Billing Summary</h3>
          <div className="space-y-3 text-gray-700 text-lg">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-xl text-gray-900">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
          <button
            onClick={handleBilling}
            className="mt-6 w-full py-3 bg-teal-600 text-white text-lg rounded-md hover:bg-teal-700 transition"
          >
            ✅ Complete Billing
          </button>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setShowReceipt(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">🧾 Receipt</h2>
            <p className="text-gray-500 text-sm text-center mb-2">{currentDateTime}</p>

            <div className="border-t border-b py-4 my-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-gray-800 text-lg">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>₹{tax}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between gap-4">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                🖨️ Print Receipt
              </button>
              <button
                onClick={resetOrder}
                className="flex-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                🆕 New Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POS;
