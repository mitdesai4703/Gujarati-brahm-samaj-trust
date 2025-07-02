import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaTrashAlt,
} from "react-icons/fa";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBookings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/get-all`,
        { withCredentials: true }
      );
      setBookings(res.data);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/update/${id}`,
        { bookingStatus: status.toLowerCase() }, // ensure lowercase
        { withCredentials: true }
      );
      toast.success(`Booking ${status.toLowerCase()} successfully`);
      getAllBookings();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/cancel/${id}`,
        { withCredentials: true }
      );
      toast.success("Booking deleted successfully");
      getAllBookings();
    } catch (error) {
      toast.error("Error deleting booking");
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <div className="min-h-screen px-4 md:px-10 py-10 overflow-x-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Bookings</h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="w-full table-auto border-collapse bg-white shadow-md rounded">
          <thead className="bg-gray-100 text-left">
            <tr className="text-sm text-gray-700">
              <th className="p-3 border">User</th>
              <th className="p-3 border">Hall</th>
              <th className="p-3 border">Event</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Guests</th>
              <th className="p-3 border">Duration</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Message</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="text-sm text-gray-800 hover:bg-gray-50">
                <td className="p-3 border">{booking.user?.name || "N/A"}</td>
                <td className="p-3 border">{booking.hall?.name || "N/A"}</td>
                <td className="p-3 border">{booking.eventType}</td>
                <td className="p-3 border">{new Date(booking.date).toLocaleDateString()}</td>
                <td className="p-3 border">{booking.guests}</td>
                <td className="p-3 border">{booking.duration}</td>
                <td className="p-3 border">₹{booking.amount}</td>
                <td className="p-3 border">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      booking.bookingStatus === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.bookingStatus === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>
                </td>
                <td className="p-3 border">
                  {booking.message || <span className="text-gray-400">—</span>}
                </td>
                <td className="p-3 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(booking._id, "confirmed")}
                      title="Approve"
                      className="text-green-600 hover:text-green-700"
                    >
                      <FaCheckCircle size={18} />
                    </button>
                    <button
                      onClick={() => updateStatus(booking._id, "cancelled")}
                      title="Reject"
                      className="text-red-600 hover:text-red-700"
                    >
                      <FaTimesCircle size={18} />
                    </button>
                    <button
                      onClick={() => deleteBooking(booking._id)}
                      title="Delete"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBookings;
