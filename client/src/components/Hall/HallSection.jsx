import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const HallSection = () => {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/halls/get-all`);
      setHalls(response.data.halls || []);
    } catch (error) {
      toast.error("Failed to fetch halls: " + error.message);
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
          {halls.map((hall) => (
            <div
              key={hall._id}
              onClick={() => navigate(`/hall/${hall._id}`)}
              className="cursor-pointer border rounded-lg shadow hover:shadow-md transition bg-white"
            >
              {hall.images && hall.images.length > 0 && (
                <img
                  src={hall.images[0]}
                  alt={hall.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h2 className="font-bold text-lg text-gray-800">{hall.name}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {hall.description?.substring(0, 80)}...
                </p>
                <div className="text-sm text-gray-700 mt-2">
                  City: <strong>{hall.city}</strong><br />
                  Price: ₹{hall.price} | Capacity: {hall.capacity}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HallSection;
