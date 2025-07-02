import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";

const AdminHallPage = () => {
  const navigate = useNavigate();
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/halls/get-all`);
      const data = Array.isArray(res.data) ? res.data : res.data.halls;
      setHalls(data || []);
    } catch (err) {
      toast.error("Failed to fetch halls: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hall?")) return;
    const toastId = toast.loading("Deleting hall...");
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/halls/delete/${id}`);
      toast.success("Hall deleted successfully", { id: toastId });
      getData();
    } catch (err) {
      toast.error("Failed to delete hall: " + err.message, { id: toastId });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Hall Management</h1>
        <button
          onClick={() => navigate("/admin/halls/create")}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          + Add Hall
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading halls...</p>
      ) : halls.length === 0 ? (
        <p className="text-gray-500">No halls available yet.</p>
      ) : (
        <div className="overflow-x-auto rounded border">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-900 font-semibold">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Capacity</th>
                <th className="px-4 py-3">Available</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {halls.map((hall) => (
                <tr key={hall._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{hall.name}</td>
                  <td className="px-4 py-2">{hall.city}</td>
                  <td className="px-4 py-2">{hall.address}</td>
                  <td className="px-4 py-2 text-blue-600">
                    {import.meta.env.VITE_CURRENCY}
                    {hall.price}
                  </td>
                  <td className="px-4 py-2">{hall.capacity}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`font-medium ${hall.isAvailable ? "text-green-600" : "text-red-600"}`}
                    >
                      {hall.isAvailable ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2 items-center">
                    <button
                      onClick={() => navigate(`/admin/halls/edit/${hall._id}`)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(hall._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminHallPage;
