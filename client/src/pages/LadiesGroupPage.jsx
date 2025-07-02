import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const LadiesGroupPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    message: "",
  });

  const [events, setEvents] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const { name, phone, email, area, message } = form;

  const textMessage = `*New Ladies Group Join Request*\n\n *Name:* ${name}\n *Phone:* ${phone}\n *Email:* ${email}\n *Area:* ${area}\n *Message:* ${message || "No message"}`;

  const whatsappNumber = "919510544723"; 
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`;

  window.open(whatsappURL, "_blank");

  toast.success("Redirecting to WhatsApp...");
  setForm({ name: "", phone: "", email: "", area: "", message: "" });
};


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events/ladies`);
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="bg-pink-50 min-h-screen text-gray-800">
   
      <section className="bg-gradient-to-r from-pink-200 to-pink-100 py-16 px-4 text-center">
        <h1 className="text-5xl font-extrabold text-pink-700 mb-4">Ladies Group</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Be a part of our vibrant community of women celebrating culture, seva, and sisterhood.
        </p>
      </section>

   
      <section className="max-w-6xl mx-auto py-14 px-4">
        <h2 className="text-3xl font-semibold text-pink-700 mb-8 text-center">Upcoming Events</h2>
        {events.length > 0 ? (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {events.map((event, i) => (
            <div
  key={i}
  className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300 p-6 flex flex-col justify-between border border-pink-100"
>
  <div className="mb-4">
    <div className="flex items-center gap-2 mb-2">
      <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs font-medium uppercase">
        {new Date(event.date).toLocaleDateString()}
      </span>
      <span className="bg-pink-50 text-pink-600 px-2 py-1 rounded text-xs">{event.time || "TBD"}</span>
    </div>
    <h3 className="text-xl font-semibold text-pink-700 mb-1">{event.title}</h3>
    <p className="text-sm text-gray-600">{event.description}</p>
  </div>

  <div className="mt-auto text-sm text-gray-500 space-y-1 border-t pt-3 border-gray-200">
    <p>
      📍 <span className="font-medium text-gray-700">Location:</span> {event.location || "N/A"}
    </p>
    <p>
      🗓️ <span className="font-medium text-gray-700">Date:</span>{" "}
      {new Date(event.date).toLocaleDateString()}
    </p>
    <p>
      🕒 <span className="font-medium text-gray-700">Time:</span> {event.time || "TBD"}
    </p>
  </div>
</div>

            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No upcoming events yet. Please check back later.</p>
        )}
      </section>

  
      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-semibold text-center text-pink-700 mb-8">Join the Ladies Group</h2>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              required
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
            <input
              name="phone"
              required
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
            <input
              name="email"
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
            <input
              name="area"
              required
              placeholder="Area / City"
              value={form.area}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
          </div>
          <textarea
            name="message"
            rows="4"
            placeholder="Why would you like to join?"
            value={form.message}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
          <div className="text-center">
            <button
              type="submit"
              className="bg-pink-600 text-white font-semibold px-8 py-3 rounded hover:bg-pink-700 transition"
            >
              Submit Request
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default LadiesGroupPage;
