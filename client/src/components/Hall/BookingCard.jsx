import React, { useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import BookingCheckoutForm from "./BookingCheckoutForm";

const stripePublicKey =
  "pk_test_51QoKVRHr2FbUrmkwpObpxLIhtb6toGQc6lHFu7elMqWTNQprPfIdXEKUKwu8alyrZ4ofnZgCIoEvXVSKRpdeeh8M00b9AVklW8";
const stripePromise = loadStripe(stripePublicKey);

const BookingCard = ({ hallData, reloadHallData }) => {
  const [amount, setAmount] = useState(hallData.price || 1000);
  const [message, setMessage] = useState("");
  const [eventType, setEventType] = useState("");
  const [guests, setGuests] = useState("");
  const [requirements, setRequirements] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  const [clientSecretToken, setClientSecretToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const getClientSecretToken = async () => {
    if (!eventType || !guests || !date || !duration) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/payments/create-payment-intent`,
        { amount }
      );
      setClientSecretToken(response.data.clientSecret);
      setShowCheckoutForm(true);
    } catch (error) {
      toast.error(error.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const options = { clientSecret: clientSecretToken };

  return (
    <div className="p-5 border border-solid border-gray-300 rounded shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Book Hall</h2>
      <p className="text-sm text-gray-600 mb-4">
        <strong>Price:</strong> ₹{hallData.price}
      </p>

      <div className="mb-3">
        <label className="block text-sm text-gray-600 mb-1">Event Type *</label>
        <select
          className="border w-full p-2 rounded"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Wedding">Wedding</option>
          <option value="Party">Party</option>
          <option value="Seminar">Seminar</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-600 mb-1">
          Number of Guests *
        </label>
        <input
          type="number"
          min={1}
          className="border w-full p-2 rounded"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-600 mb-1">
          Date of Event *
        </label>
        <input
          type="date"
          className="border w-full p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-600 mb-1">
          Duration (in hours or days) *
        </label>
        <input
          type="text"
          placeholder="e.g. 6 hours or 2 days"
          className="border w-full p-2 rounded"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-600 mb-1">
          Special Requirements (optional)
        </label>
        <textarea
          rows="3"
          className="border w-full p-2 rounded"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-600 mb-1">
          Message (optional)
        </label>
        <textarea
          rows="2"
          className="border w-full p-2 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button
        onClick={getClientSecretToken}
        disabled={loading}
        className={`w-full mt-5 py-2 rounded text-white font-semibold ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-500 cursor-pointer"
        }`}
      >
        {loading ? "Processing..." : "Book Now"}
      </button>

      {clientSecretToken && (
        <Elements stripe={stripePromise} options={options}>
          <BookingCheckoutForm
            open={showCheckoutForm}
            onClose={() => {
              setClientSecretToken("");
              setShowCheckoutForm(false);
            }}
            hallData={hallData}
            amount={amount}
            bookingDetails={{
              eventType,
              guests,
              date,
              duration,
              requirements,
              message,
            }}
            reloadHallData={() => {
              reloadHallData();
              setMessage("");
              setEventType("");
              setGuests("");
              setRequirements("");
              setDate("");
              setDuration("");
            }}
          />
        </Elements>
      )}
    </div>
  );
};

export default BookingCard;
