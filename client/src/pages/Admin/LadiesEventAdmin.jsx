import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";


const LadiesEventAdmin = () => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events/ladies`, {
        withCredentials: true,
      });
      setEvents(res.data);
    } catch (err) {
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setEvent({ title: "", description: "", date: "", time: "", location: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event.title || !event.date) return toast.error("Title and Date are required.");

    try {
      toast.loading(editingId ? "Updating event..." : "Creating event...");
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/events/ladies/update/${editingId}`,
          event,
          { withCredentials: true }
        );
        toast.success("Event updated successfully!");
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/events/ladies/create`, event, {
          withCredentials: true,
        });
        toast.success("Event created successfully!");
      }
      toast.dismiss();
      resetForm();
      fetchEvents();
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to save event.");
    }
  };

  const handleEdit = (evt) => {
    setEvent(evt);
    setEditingId(evt._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/events/ladies/delete/${id}`,
        { withCredentials: true }
      );
      toast.success("Event deleted");
      fetchEvents();
    } catch (err) {
      toast.error("Failed to delete event");
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-center text-pink-700 mb-6">
          {editingId ? "Edit Event" : "Add New Ladies Group Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={event.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="w-full border p-3 rounded"
            required
          />
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            placeholder="Short Description"
            className="w-full border p-3 rounded"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="date"
              type="date"
              value={event.date}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
            <input
              name="time"
              type="time"
              value={event.time}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>
          <input
            name="location"
            value={event.location}
            onChange={handleChange}
            placeholder="Event Location"
            className="w-full border p-3 rounded"
          />
          <div className="text-center space-x-2">
            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
            >
              {editingId ? "Update Event" : "Create Event"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Event List */}
      <div className="max-w-5xl mx-auto mt-10">
        <h3 className="text-xl font-semibold text-pink-700 mb-4">All Events</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-300 rounded shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No events found.
                  </td>
                </tr>
              )}
              {events.map((evt) => (
                <tr key={evt._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{evt.title}</td>
                  <td className="p-2 border">{evt.date?.slice(0, 10)}</td>
                  <td className="p-2 border">{evt.time || "-"}</td>
                  <td className="p-2 border">{evt.location || "-"}</td>
                  <td className="p-2 border text-center space-x-2">
                   <button
  onClick={() => handleEdit(evt)}
  className="text-blue-600 hover:text-blue-800 text-lg p-1"
  title="Edit"
>
  <FaEdit />
</button>
<button
  onClick={() => handleDelete(evt._id)}
  className="text-red-600 hover:text-red-800 text-lg p-1"
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
      </div>
    </div>
  );
};

export default LadiesEventAdmin;
