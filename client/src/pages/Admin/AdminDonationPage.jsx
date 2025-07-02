import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const COLORS = [
  "#EF4444",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#22D3EE",
  "#6366F1",
];

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showChart, setShowChart] = useState(true);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/donations/get-all`, {
          withCredentials: true,
        });
        setDonations(response.data);
      } catch (err) {
        console.error("Error fetching donations", err);
        alert("Failed to load donation data");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const paginated = donations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const chartData = Object.values(
    donations.reduce((acc, donation) => {
      const name = donation.campaign?.name?.trim() || "Unknown";
      acc[name] = acc[name] || { name, total: 0 };
      acc[name].total += donation.amount;
      return acc;
    }, {})
  );

  const exportCSV = () => {
    const csv = Papa.unparse(
      donations.map((d) => ({
        Campaign: d.campaign?.name,
        User: d.user?.name,
        Amount: d.amount,
        PaymentID: d.paymentId,
        Date: dayjs(d.createdAt).format("MMM DD, YYYY h:mm A"),
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "donations.csv");
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-red-700">All Donations Overview</h1>

  
      <div className="flex flex-wrap gap-3">
        <button
          onClick={exportCSV}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
        <button
          onClick={() => setShowChart(!showChart)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {showChart ? "Hide Chart" : "Show Chart"}
        </button>
      </div>

      {/* Pie Chart */}
      {showChart && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Donation Distribution by Campaign</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="total"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 border-b">User</th>
              <th className="px-4 py-3 border-b">Campaign</th>
              <th className="px-4 py-3 border-b">Amount</th>
              <th className="px-4 py-3 border-b">Payment ID</th>
              <th className="px-4 py-3 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((donation) => (
              <tr key={donation._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{donation.user?.name || "Anonymous"}</td>
                <td className="px-4 py-2 border-b">
                  <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                    {donation.campaign?.name?.trim() || "N/A"}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">₹{donation.amount}</td>
                <td className="px-4 py-2 border-b">{donation.paymentId}</td>
                <td className="px-4 py-2 border-b">
                  {dayjs(donation.createdAt).format("MMM DD, YYYY h:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(donations.length / itemsPerPage) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDonations;
