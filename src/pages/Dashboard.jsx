// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import axios from "axios";

const COLORS = ["#0D9488", "#10B981", "#3B82F6", "#8B5CF6"];

const Dashboard = () => {
  const [statCards, setStatCards] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [stockStatusData, setStockStatusData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://codigoaldea1.pythonanywhere.com/api/home");

        // Example hardcoded sales/revenue/category data (replace if API provides these)
        const mockSalesData = [
          { name: "Jan", sales: 4000 },
          { name: "Feb", sales: 3000 },
          { name: "Mar", sales: 2000 },
          { name: "Apr", sales: 2780 },
          { name: "May", sales: 1890 },
          { name: "Jun", sales: 2390 },
        ];
        const mockRevenueData = [
          { name: "Jan", revenue: 22000 },
          { name: "Feb", revenue: 24000 },
          { name: "Mar", revenue: 20000 },
          { name: "Apr", revenue: 27800 },
          { name: "May", revenue: 30000 },
          { name: "Jun", revenue: 32000 },
        ];
        const mockCategoryData = [
          { name: "Tablets", value: 400 },
          { name: "Syrups", value: 300 },
          { name: "Injections", value: 300 },
          { name: "Ointments", value: 200 },
        ];

        // Prepare stat cards with backend values
        const updatedStatCards = [
          {
            title: "Total Sales",
            value: `₹${data.total_sales.toLocaleString()}`,
            growth: "+12%", // static for now
            positive: true,
            color: "bg-teal-100",
            text: "text-teal-800",
          },
          {
            title: "Medicines in Stock",
            value: data.medicine_stocks_count.toString(),
            growth: "-5%", // static
            positive: false,
            color: "bg-green-100",
            text: "text-green-800",
          },
          {
            title: "Orders",
            value: data.total_orders_count.toString(),
            growth: "+8%", // static
            positive: true,
            color: "bg-blue-100",
            text: "text-blue-800",
          },
          {
            title: "Customers",
            value: data.customer_count.toString(),
            growth: "+3%", // static
            positive: true,
            color: "bg-purple-100",
            text: "text-purple-800",
          },
          {
            title: "Expired Medicines",
            value: data.expired_medicine_count.toString(),
            growth: "+10%", // static
            positive: false,
            color: "bg-red-100",
            text: "text-red-800",
          },
          {
            title: "Low Stock Alerts",
            value: data.low_stock_count.toString(),
            growth: "+6%", // static
            positive: false,
            color: "bg-yellow-100",
            text: "text-yellow-800",
          },
          {
            title: "Pending Orders",
            value: data.pending_order_count.toString(),
            growth: "-2%", // static
            positive: false,
            color: "bg-orange-100",
            text: "text-orange-800",
          },
          {
            title: "This Month's Revenue",
            value: `₹${data.monthly_revenue.toLocaleString()}`,
            growth: "+15%", // static
            positive: true,
            color: "bg-indigo-100",
            text: "text-indigo-800",
          },
        ];

        setStatCards(updatedStatCards);
        setSalesData(mockSalesData); // replace with real data when available
        setRevenueData(mockRevenueData); // replace with real data when available
        setCategoryData(mockCategoryData); // replace with real data when available

        // For Pie chart (stock status)
        setStockStatusData([
          { name: "In Stock", value: data.medicine_stocks_count },
          { name: "Low Stock", value: data.low_stock_count },
          { name: "Expired", value: data.expired_medicine_count },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-1 text-gray-800">Welcome Back!</h2>
      <p className="text-gray-500 mb-6">
        Here’s a detailed view of your pharmacy performance and analytics.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`p-5 rounded-xl shadow-md ${card.color} ${card.text} transition hover:shadow-lg`}
          >
            <p className="text-sm font-medium mb-1">{card.title}</p>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">{card.value}</h3>
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  card.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {card.positive ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}
                {card.growth}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Monthly Sales Overview
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#0D9488" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Revenue Trends (Last 6 Months)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Medicine Category Distribution
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stock Status Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Medicine Stock Status
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {stockStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
