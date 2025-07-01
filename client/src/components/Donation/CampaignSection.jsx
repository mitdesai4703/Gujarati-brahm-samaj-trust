import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CampaignSection = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/get-all`);
      setCampaigns(response.data.campaigns || []);
    } catch (error) {
      toast.error("Failed to fetch campaigns: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-6 mt-16">
    
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              onClick={() => navigate(`/campaign/${campaign._id}`)}
              className="cursor-pointer border rounded-lg shadow hover:shadow-md transition bg-white"
            >
              {campaign.images && campaign.images.length > 0 && (
                <img
                  src={campaign.images[0]}
                  alt={campaign.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h2 className="font-bold text-lg text-gray-800">{campaign.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{campaign.description?.substring(0, 80)}...</p>

                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded">
                    <div
                      className="h-2 bg-green-500 rounded"
                      style={{
                        width: `${Math.min(
                          (campaign.collectedAmount / campaign.targetAmount) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ₹{campaign.collectedAmount || 0} raised of ₹{campaign.targetAmount}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignSection;
