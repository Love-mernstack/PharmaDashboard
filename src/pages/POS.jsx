import React, { useState, useEffect } from "react";
import { Search, Trash2 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const registeredCustomers = [
  { name: "Amit Kumar", mobile: "9876543210" },
  { name: "Sneha Sharma", mobile: "9123456789" },
  { name: "Love", mobile: "9877727858" },
];

const medicines = [
  { id: 1, name: "Paracetamol", price: 50 },
  { id: 2, name: "Amoxicillin", price: 80 },
  { id: 3, name: "Cough Syrup", price: 120 },
  { id: 4, name: "Insulin", price: 250 },
];

const POS = () => {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerFound, setCustomerFound] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const addToCart = (med) => {
    const exists = cart.find((item) => item.id === med.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === med.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...med, quantity: 1 }]);
    }
    setQuery("");
  };

  const removeFromCart = (id) =>
    setCart(cart.filter((item) => item.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = +(subtotal * 0.05).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const filteredMeds = medicines.filter((med) =>
    med.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const found = registeredCustomers.find(
      (cust) => cust.mobile === customerMobile.trim()
    );
    if (found) {
      setCustomerName(found.name);
      setCustomerFound(true);
    } else {
      setCustomerName("");
      setCustomerFound(false);
    }
  }, [customerMobile]);

  const generatePDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 10;

  // Draw Border
  doc.setDrawColor(150);
  doc.rect(margin, margin, pageWidth - margin * 2, 270, 'S');

  // Header
  doc.setFontSize(16);
  doc.text("PharmaDash - Invoice", margin + 4, 20);
  doc.setFontSize(10);
  doc.text("ABC Pharmacy, 123 Market Street", margin + 4, 26);
  doc.text("Phone: 0123-456789 | GSTIN: 22ABCDE1234FZ1", margin + 4, 31);

  // Customer and Date Info
  doc.setFontSize(12);
  doc.text(`Customer: ${customerName}`, margin + 4, 42);
  doc.text(`Mobile: ${customerMobile}`, margin + 4, 48);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin - 4, 42, { align: "right" });
  doc.text(`Time: ${new Date().toLocaleTimeString()}`, pageWidth - margin - 4, 48, { align: "right" });

  // Table Content
  const tableData = cart.map((item, index) => [
    index + 1,
    item.name,
    item.quantity,
    item.price.toFixed(2),
    (item.price * item.quantity).toFixed(2),
  ]);

  autoTable(doc, {
    startY: 58,
    head: [["#", "Medicine", "Qty", "Price", "Amount"]],
    body: tableData,
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [0, 128, 128], textColor: 255 },
    margin: { left: margin, right: margin },
  });

  const finalY = doc.lastAutoTable.finalY || 70;

  // Billing Summary
  doc.setFontSize(12);
  doc.text(`Subtotal: ${subtotal.toFixed(2)}`, pageWidth - margin - 4, finalY + 10, { align: "right" });
  doc.text(`Tax (5%): ${tax.toFixed(2)}`, pageWidth - margin - 4, finalY + 16, { align: "right" });
  doc.setFontSize(13);
  doc.text(`Total: ${total.toFixed(2)}`, pageWidth - margin - 4, finalY + 24, { align: "right" });

  // Thank you message
  doc.setFontSize(10);
  doc.text("Thank you for shopping with us!", margin + 4, finalY + 34);
  doc.text("Visit Again!", margin + 4, finalY + 40);

  // GST Terms & Conditions
  doc.setFontSize(9);
  doc.text("Terms & Conditions:", margin + 4, finalY + 52);
  doc.setFontSize(8);
  const terms = [
    "1. Goods once sold will not be taken back or exchanged.",
    "2. All disputes are subject to jurisdiction of local courts only.",
    "3. This is a computer-generated invoice and does not require a signature.",
    "4. Please check the medicines and bill before leaving the counter.",
    "5. GST included as applicable under government norms.",
  ];
  terms.forEach((line, i) => {
    doc.text(line, margin + 6, finalY + 58 + i * 5);
  });

  // Signature Line
  doc.setDrawColor(0);
  doc.line(pageWidth - 60, 270, pageWidth - 10, 270); // signature line
  doc.text("Authorized Signature", pageWidth - 60, 275);

  // Save
  doc.save(`Invoice_${customerName || "Customer"}.pdf`);
};



  const handleBilling = () => {
    if (!customerMobile.trim() || !customerName.trim() || cart.length === 0) return;
    if (!customerFound) {
      registeredCustomers.push({ name: customerName, mobile: customerMobile });
    }
    setShowPopup(true);
  };

  const confirmDownload = () => {
    generatePDF();
    resetOrder();
    setShowPopup(false);
  };

  const resetOrder = () => {
    setCart([]);
    setCustomerMobile("");
    setCustomerName("");
    setCustomerFound(false);
  };

  return (
    <div className="p-6 relative">
      <h2 className="text-4xl font-bold text-gray-900 mb-2">💳 Point of Sale</h2>
      <p className="text-gray-500 mb-6">
        Enter customer mobile to autofill or register new customer.
      </p>

      <div className="mb-4 max-w-md">
        <input
          type="tel"
          placeholder="Enter Mobile Number"
          value={customerMobile}
          onChange={(e) => setCustomerMobile(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-lg"
        />
      </div>

      {customerMobile.trim() && (
        <div className="mb-6 max-w-md">
          {customerFound ? (
            <p className="text-green-600 text-lg">
              ✅ Welcome back, <strong>{customerName}</strong>
            </p>
          ) : (
            <input
              type="text"
              placeholder="Enter Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-lg"
            />
          )}
        </div>
      )}

      {/* Medicine Search */}
      <div className="relative max-w-md mb-6">
        <input
          type="text"
          placeholder="Search medicine..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-lg"
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
                {med.name} - Rs. {med.price}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cart Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  <td className="px-6 py-4">Rs. {item.price}</td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => updateQty(item.id, +e.target.value)}
                      className="w-20 px-2 py-2 border border-gray-300 rounded-md text-center text-lg"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    Rs. {item.price * item.quantity}
                  </td>
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
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>Rs. {tax}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-xl text-gray-900">
              <span>Total</span>
              <span>Rs. {total}</span>
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

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Billing Completed 🎉</h2>
            <p className="mb-6 text-gray-600">Do you want to download the receipt?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowPopup(false);
                  resetOrder();
                }}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                No
              </button>
              <button
                onClick={confirmDownload}
                className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-md"
              >
                Yes, Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POS;
