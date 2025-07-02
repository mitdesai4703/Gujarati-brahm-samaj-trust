import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import DonationCard from "../../components/Donation/DonationCard";

const CampaignInfo = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [campaignData, setCampaignData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);  
  const params = useParams();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/campaigns/get/${params.id}`
      );
      setCampaignData(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [params.id]);

  useEffect(() => {
    if (campaignData?.images?.length > 0) {
      setSelectedImage(campaignData.images[0]);
    }
  }, [campaignData]);

  return (
    <div className="min-h-screen pt-10 px-4 md:px-20 pb-40">
      <button
        onClick={() => navigate("/campaignpage")}
        className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-500 cursor-pointer"
      >
        Back To Campaigns
      </button>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      ) : campaignData ? (
        <div className="mt-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {campaignData.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5">
            <div className="col-span-2">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={campaignData.name}
                  className="rounded w-full md:h-[500px] object-cover"
                />
              ) : (
                <div>No image available</div>
              )}

              <div className="flex gap-5 mt-5 flex-wrap">
                {campaignData.images.map((image, index) => (
                  <img
                    src={image}
                    key={index}
                    alt={`Campaign Image ${index + 1}`}
                    className="w-24 h-24 rounded object-cover cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            </div>

            <div className="col-span-1">
              <DonationCard
                campaignData={campaignData}
                reloadCampaignData={getData}
              />
            </div>
          </div>

          <p className="text-base text-gray-700 mt-6 leading-relaxed">
            {campaignData.description}
          </p>
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-500">No campaign data found</div>
      )}
    </div>
  );
};

export default CampaignInfo;
