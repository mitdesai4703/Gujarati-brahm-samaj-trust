import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import BookingCard from "../../components/Hall/BookingCard";

const HallInfo = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [hallData, setHallData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const getHallData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/halls/get/${params.id}`
      );
      setHallData(response.data);
    } catch (error) {
      toast.error("Failed to fetch hall: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHallData();
  }, [params.id]);

  useEffect(() => {
    if (hallData?.images?.length > 0) {
      setSelectedImage(hallData.images[0]);
    }
  }, [hallData]);

  return (
    <div className="min-h-screen pt-10 px-4 md:px-20 pb-20 bg-gray-50">
      <button
        onClick={() => navigate("/halls")}
        className="mb-6 bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-md text-sm font-medium"
      >
        ← Back to Halls
      </button>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      ) : hallData ? (
        <div className="mt-5 space-y-8">
          <h1 className="text-4xl font-bold text-gray-800">{hallData.name}</h1>

  
          {selectedImage && (
            <img
              src={selectedImage}
              alt={hallData.name}
              className="rounded-xl w-full max-h-[500px] object-cover shadow-md"
            />
          )}

     
          <div className="flex gap-4 flex-wrap mt-3">
            {hallData.images.map((image, index) => (
              <img
                src={image}
                key={index}
                alt={`Image ${index + 1}`}
                className={`w-24 h-24 rounded-lg object-cover border-2 cursor-pointer ${
                  selectedImage === image ? "border-blue-600" : "border-transparent"
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>

      
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
            <div className="lg:col-span-2 space-y-5 bg-white rounded-xl shadow p-6">
              <div className="space-y-2 text-gray-700 text-[15px] leading-relaxed">
                <p><span className="font-semibold"> City:</span> {hallData.city}</p>
                <p><span className="font-semibold">Address:</span> {hallData.address}</p>
                <p><span className="font-semibold"> Contact:</span> {hallData.contact}</p>
                <p><span className="font-semibold"> Price:</span> ₹{hallData.price}</p>
                <p><span className="font-semibold"> Capacity:</span> {hallData.capacity} people</p>
                <p>
                  <span className="font-semibold">Availability:</span>{" "}
                  {hallData.isAvailable ? (
                    <span className="text-green-600 font-medium">Available</span>
                  ) : (
                    <span className="text-red-500 font-medium">Not Available</span>
                  )}
                </p>
                <div>
                  <span className="font-semibold">Amenities:</span>
                  <ul className="list-disc list-inside mt-1 ml-1">
                    {hallData.amenities?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{hallData.description}</p>
              </div>
            </div>

           
            <div>
              <BookingCard hallData={hallData} reloadHallData={getHallData} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-500">No hall data found</div>
      )}
    </div>
  );
};

export default HallInfo;
