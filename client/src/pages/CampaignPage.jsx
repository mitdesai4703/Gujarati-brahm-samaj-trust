import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";

const CampaignPage = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/get-all`);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.campaigns;
      setCampaigns(data || []);
    } catch (error) {
      toast.error("Failed to fetch campaigns: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this campaign?");
    if (!confirmDelete) return;

    const toastId = toast.loading("Deleting campaign...");
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/delete/${id}`);
      toast.success("Campaign deleted successfully", { id: toastId });
      getData();
    } catch (error) {
      toast.error("Error deleting campaign: " + error.message, { id: toastId });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Campaigns</h1>
        <button
          onClick={() => navigate("/admin/campaigns/create")}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          + Create Campaign
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p className="text-gray-500">No campaigns available yet.</p>
      ) : (
        <div className="overflow-x-auto rounded border">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-900 font-semibold">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Organizer</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Target</th>
                <th className="px-4 py-3">Collected</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{campaign.name.trim()}</td>
                  <td className="px-4 py-2">{campaign.organizer}</td>
                  <td className="px-4 py-2 capitalize">{campaign.category}</td>
                  <td className="px-4 py-2">
                    {import.meta.env.VITE_CURRENCY}
                    {campaign.targetAmount}
                  </td>
                  <td className="px-4 py-2 text-green-700">
                    {import.meta.env.VITE_CURRENCY}
                    {campaign.collectedAmount || 0}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`font-medium ${campaign.isActive ? "text-green-600" : "text-red-600"}`}
                    >
                      {campaign.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2 items-center">
                    <button
                      onClick={() => navigate(`/admin/campaigns/edit/${campaign._id}`)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(campaign._id)}
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

export default CampaignPage;
