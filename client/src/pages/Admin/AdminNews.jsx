import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUpload, FaTimes, FaTrashAlt, FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";

const AdminNewsPage = () => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    summary: "",
    content: "",
  });
  const [newsList, setNewsList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/news`);
      setNewsList(res.data);
    } catch (err) {
      console.error("Failed to fetch news", err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewURL(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("date", form.date);
    formData.append("summary", form.summary);
    formData.append("content", form.content);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      if (isEditing) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/news/${editingId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("News updated successfully");
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/news/create`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("News created successfully");
      }

      setForm({ title: "", date: "", summary: "", content: "" });
      setSelectedFile(null);
      setPreviewURL(null);
      setIsEditing(false);
      setEditingId(null);
      fetchNews();
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Failed to submit news");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this news?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/news/${id}`);
      toast.success("News deleted");
      fetchNews();
    } catch (err) {
      toast.error("Failed to delete news");
    }
  };

  const handleEdit = (news) => {
    setForm({
      title: news.title,
      date: news.date.split("T")[0],
      summary: news.summary,
      content: news.content,
    });
    setPreviewURL(news.image || null);
    setIsEditing(true);
    setEditingId(news._id);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Admin News Management</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10 bg-white p-4 rounded shadow">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="summary"
          placeholder="Summary"
          value={form.summary}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="content"
          placeholder="Full Content"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={4}
        />

        <div className="border p-2 rounded bg-gray-50">
          <label className="block font-medium mb-2">Upload Image</label>
          <div className="flex items-center gap-4">
            {!previewURL ? (
              <>
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer text-blue-700 bg-blue-100 px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-200 transition"
                >
                  <FaUpload className="text-xl" />
                  Upload Image
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
            ) : (
              <div className="relative">
                <img
                  src={previewURL}
                  alt="Preview"
                  className="h-32 object-contain rounded border"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded cursor-pointer"
        >
          {isEditing ? "Update News" : "Add News"}
        </button>
      </form>

      {/* News Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Summary</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsList.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No news found.
                </td>
              </tr>
            ) : (
              newsList.map((news) => (
                <tr key={news._id} className="text-sm">
                  <td className="border px-2 py-2 text-center">
                    {news.image ? (
                      <img src={news.image} alt="img" className="h-16 mx-auto rounded" />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border px-2 py-2">{news.title}</td>
                  <td className="border px-2 py-2">
                    {new Date(news.date).toLocaleDateString("en-IN")}
                  </td>
                  <td className="border px-2 py-2">{news.summary}</td>
                  <td className="border px-2 py-2 flex gap-3 justify-center">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleEdit(news)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(news._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminNewsPage;
