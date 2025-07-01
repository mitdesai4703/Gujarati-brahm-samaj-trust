import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { uploadFilesToCloudinary } from "../../helpers/upload";

const CampaignForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [campaignData, setCampaignData] = useState({});
  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCampaignData({ ...campaignData, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    const value =
      e.target.value === "true"
        ? true
        : e.target.value === "false"
        ? false
        : e.target.value;
    setCampaignData({ ...campaignData, [e.target.name]: value });
  };

const onSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);

   
    const newImageUrls = await uploadFilesToCloudinary(selectedImageFiles);
    const imageUrls = [...uploadedImages, ...newImageUrls];

    const values = {
      ...campaignData,
      images: imageUrls,
    };

    if (!params.id) {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/create`, values);
      alert("Campaign created successfully");
    } else {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/campaigns/update/${params.id}`,
        values
      );
      alert("Campaign updated successfully");
    }

    navigate(-1);
  } catch (error) {
    alert("Error: " + error.message);
  } finally {
    setLoading(false);
  }
};


  const getCampaignData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/campaigns/get/${params.id}`
      );
      setCampaignData(response.data);
      setUploadedImages(response.data.images || []);
    } catch (error) {
      alert("Error fetching campaign: " + error.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      getCampaignData();
    }
  }, [params.id]);

  const showForm =
    !params.id || (params.id && Object.keys(campaignData).length > 0);

  return (
    <div className="min-h-screen pt-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {params.id ? "Edit Campaign" : "Create Campaign"}
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
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={campaignData.name || ""}
        onChange={handleChange}
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">Organizer</label>
      <input
        type="text"
        name="organizer"
        required
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={campaignData.organizer || ""}
        onChange={handleChange}
      />
    </div>
  </div>


  <div>
    <label className="block font-semibold mb-1">Description</label>
    <textarea
      name="description"
      required
      rows={4}
      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={campaignData.description || ""}
      onChange={handleChange}
    />
  </div>


  <div className="grid md:grid-cols-3 gap-6">
    <div>
      <label className="block font-semibold mb-1">Target Amount</label>
      <input
        type="number"
        name="targetAmount"
        required
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={campaignData.targetAmount || ""}
        onChange={handleChange}
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">Category</label>
      <select
        name="category"
        required
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={campaignData.category || ""}
        onChange={handleSelect}
      >
        <option value="">Select Category</option>
        <option value="education">Education</option>
        <option value="health">Health</option>
        <option value="environment">Environment</option>
        <option value="animals">Animals</option>
        <option value="humanRights">Human Rights</option>
        <option value="sports">Sports</option>
      </select>
    </div>

    <div>
      <label className="block font-semibold mb-1">Is Active</label>
      <select
        name="isActive"
        required
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={campaignData.isActive}
        onChange={handleSelect}
      >
        <option value="">Select</option>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
    </div>
  </div>


  <div className="grid md:grid-cols-2 gap-6">
    <div>
      <label className="block font-semibold mb-1">Start Date</label>
      <input
        type="date"
        name="startDate"
        required
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={campaignData.startDate || ""}
        onChange={handleChange}
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">End Date</label>
      <input
        type="date"
        name="endDate"
        required
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={campaignData.endDate || ""}
        onChange={handleChange}
      />
    </div>
  </div>

 
  <div>
    <label className="block font-semibold mb-2">Images</label>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
     
      {uploadedImages.map((image, index) => (
        <div key={index} className="relative border border-dashed rounded p-1">
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-32 object-cover rounded"
          />
          <button
            type="button"
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            onClick={() => setUploadedImages((prev) => prev.filter((_, i) => i !== index))}
          >
            ×
          </button>
        </div>
      ))}

     
      {selectedImageFiles.map((file, index) => (
        <div key={index} className="relative border border-dashed rounded p-1">
          <img
            src={URL.createObjectURL(file)}
            alt="Selected"
            className="w-full h-32 object-cover rounded"
          />
          <button
            type="button"
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            onClick={() =>
              setSelectedImageFiles((prev) => prev.filter((_, i) => i !== index))
            }
          >
            ×
          </button>
        </div>
      ))}

 
      <label className="flex flex-col items-center justify-center border border-dashed border-gray-400 rounded h-32 cursor-pointer text-gray-500 hover:bg-gray-100 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-3 3m3-3l3 3M12 4v4"
          />
        </svg>
        <span className="text-sm">Upload</span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) =>
            setSelectedImageFiles((prev) => [
              ...prev,
              ...Array.from(e.target.files),
            ])
          }
        />
      </label>
    </div>
  </div>

 
  <div className="flex justify-end gap-4 mt-6">
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
      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      disabled={loading}
    >
      {loading ? "Saving..." : params.id ? "Update" : "Create"}
    </button>
  </div>
</form>

      )}
    </div>
  );
};

export default CampaignForm;
