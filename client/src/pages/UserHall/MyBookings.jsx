import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyBookings = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/get-my-bookings`,
        { withCredentials: true }
      );
      setBookings(response.data);
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-20 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">You have no bookings yet.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded p-5 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {booking.hall?.name || "Hall Name"}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Event:</strong> {booking.eventType}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Guests:</strong> {booking.guests}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Date:</strong> {booking.date}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Duration:</strong> {booking.duration}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Price:</strong> ₹{booking.amount}
              </p>
              {booking.message && (
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Message:</strong> {booking.message}
                </p>
              )}
              {booking.requirements && (
                <p className="text-sm text-gray-600">
                  <strong>Special Requirements:</strong> {booking.requirements}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
