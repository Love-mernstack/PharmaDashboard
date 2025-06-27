import React, { useState } from "react";
import Purchase from "./Purchase";
import Return from "./Return";

const PurchaseReturn = () => {
  const [tab, setTab] = useState("Purchase");

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">🧾 Purchase / Return</h2>
      <p className="text-gray-500 mb-6">Manage medicine stock and customer returns.</p>

      {/* Tabs */}
      <div className="mb-6">
        <button
          onClick={() => setTab("Purchase")}
          className={`px-4 py-2 rounded-t-md border-b-2 ${
            tab === "Purchase" ? "border-teal-600 text-teal-600 font-semibold" : "border-transparent text-gray-500"
          }`}
        >
          Purchase
        </button>
        <button
          onClick={() => setTab("Return")}
          className={`ml-4 px-4 py-2 rounded-t-md border-b-2 ${
            tab === "Return" ? "border-red-600 text-red-600 font-semibold" : "border-transparent text-gray-500"
          }`}
        >
          Return
        </button>
      </div>

      {/* Tab Content */}
      <div>{tab === "Purchase" ? <Purchase /> : <Return />}</div>
    </div>
  );
};

export default PurchaseReturn;
