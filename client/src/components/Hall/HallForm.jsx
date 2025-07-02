import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { uploadFilesToCloudinary } from "../../helpers/upload";
import { toast } from "react-hot-toast";

const amenityOptions = ["AC", "Parking", "Stage", "Wi-Fi", "Catering", "Lighting"];

const HallForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [hallData, setHallData] = useState({
    name: "",
    city: "",
    address: "",
    contact: "",
    price: "",
    capacity: "",
    description: "", 
    amenities: [],
    isAvailable: "",
  });

  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setHallData({ ...hallData, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    const value = e.target.value === "true" ? true : e.target.value === "false" ? false : e.target.value;
    setHallData({ ...hallData, [e.target.name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newImageUrls = await uploadFilesToCloudinary(selectedImageFiles);
      const imageUrls = [...uploadedImages, ...newImageUrls];

      const values = {
        ...hallData,
        images: imageUrls,
      };

      if (!params.id) {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/halls/create`, values, {
          withCredentials: true,
        });
        toast.success("Hall created successfully");
      } else {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/halls/update/${params.id}`, values, {
          withCredentials: true,
        });
        toast.success("Hall updated successfully");
      }

      navigate(-1);
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getHallData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/halls/get/${params.id}`);
      setHallData(response.data);
      setUploadedImages(response.data.images || []);
    } catch (error) {
      toast.error("Error fetching hall: " + error.message);
    }
  };

  useEffect(() => {
    if (params.id) getHallData();
  }, [params.id]);

  const showForm = !params.id || (params.id && Object.keys(hallData).length > 0);

  return (
    <div className="min-h-screen pt-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {params.id ? "Edit Hall" : "Create Hall"}
      </h1>

      {showForm && (
        <form onSubmit={onSubmit} className="space-y-8 max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full p-2 border rounded"
                value={hallData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">City</label>
              <input
                type="text"
                name="city"
                required
                className="w-full p-2 border rounded"
                value={hallData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Address</label>
            <input
              type="text"
              name="address"
              required
              className="w-full p-2 border rounded"
              value={hallData.address}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              required
              className="w-full p-2 border rounded"
              rows="4"
              value={hallData.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block font-semibold mb-1">Contact</label>
              <input
                type="text"
                name="contact"
                required
                className="w-full p-2 border rounded"
                value={hallData.contact}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Price</label>
              <input
                type="number"
                name="price"
                required
                className="w-full p-2 border rounded"
                value={hallData.price}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Capacity</label>
              <input
                type="number"
                name="capacity"
                required
                className="w-full p-2 border rounded"
                value={hallData.capacity}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Amenities</label>
            <div className="grid grid-cols-2 gap-2">
              {amenityOptions.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity}
                    checked={hallData.amenities.includes(amenity)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const value = e.target.value;
                      setHallData((prevData) => ({
                        ...prevData,
                        amenities: isChecked
                          ? [...(prevData.amenities || []), value]
                          : prevData.amenities.filter((item) => item !== value),
                      }));
                    }}
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Availability</label>
            <select
              name="isAvailable"
              required
              className="w-full p-2 border rounded"
              value={hallData.isAvailable}
              onChange={handleSelect}
            >
              <option value="">Select</option>
              <option value={true}>Available</option>
              <option value={false}>Not Available</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Images</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {uploadedImages.map((img, index) =>
                img ? (
                  <div key={index} className="relative border rounded">
                    <img src={img} alt={`Uploaded ${index}`} className="w-full h-32 object-cover rounded" />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                      onClick={() => setUploadedImages((prev) => prev.filter((_, i) => i !== index))}
                    >
                      ×
                    </button>
                  </div>
                ) : null
              )}

              {selectedImageFiles.map((file, index) =>
                file ? (
                  <div key={index} className="relative border rounded">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Selected ${index}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                      onClick={() => setSelectedImageFiles((prev) => prev.filter((_, i) => i !== index))}
                    >
                      ×
                    </button>
                  </div>
                ) : null
              )}

              <label className="border border-dashed border-gray-400 flex flex-col items-center justify-center h-32 rounded cursor-pointer hover:bg-gray-100 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const validFiles = Array.from(e.target.files).filter(Boolean);
                    setSelectedImageFiles((prev) => [...prev, ...validFiles]);
                  }}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Saving..." : params.id ? "Update Hall" : "Create Hall"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default HallForm;
