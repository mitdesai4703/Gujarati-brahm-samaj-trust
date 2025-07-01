import React, { useState } from "react";
import { toast } from "react-hot-toast";

import axios from "axios";

const PriestService = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    priestName: "",
    budget: "",
    eventType: "",
    location: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    toast.loading("Sending your request...");

    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/priest/request`, form);

    toast.dismiss();
    toast.success("Request sent successfully! Our team will contact you soon.");

    setForm({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      priestName: "",
      budget: "",
      eventType: "",
      location: "",
      message: "",
    });
  } catch (error) {
    toast.dismiss();
    toast.error("Failed to send. Please try again later.");
    console.error("Error:", error.message);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
    
      <section className="bg-gradient-to-r from-yellow-100 to-orange-100 py-12 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-700 mb-4">Priest Services</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Plan your religious events with peace of mind — we provide trained and trusted priests for all types of Hindu rituals.
        </p>
      </section>

     
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-orange-600">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-white rounded shadow hover:shadow-lg transition">
            <span className="text-3xl">📝</span>
            <h4 className="font-bold mt-2">Fill Request Form</h4>
            <p className="text-sm">Provide your event details, budget, and preferred priest (optional).</p>
          </div>
          <div className="p-4 bg-white rounded shadow hover:shadow-lg transition">
            <span className="text-3xl">📞</span>
            <h4 className="font-bold mt-2">Admin Will Contact You</h4>
            <p className="text-sm">Our team will confirm your request and coordinate with priests.</p>
          </div>
          <div className="p-4 bg-white rounded shadow hover:shadow-lg transition">
            <span className="text-3xl">🙏</span>
            <h4 className="font-bold mt-2">Get Priest Service</h4>
            <p className="text-sm">A reliable poojari will arrive at your location for the ceremony.</p>
          </div>
        </div>
      </section>

   
      <section className="bg-white py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4 text-center">Services We Offer</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {["Satyanarayan Katha", "Rudrabhishek", "Havan", "Grah Shanti", "Mundan Sanskar", "Marriage Pooja"].map((service, i) => (
              <div key={i} className="border rounded p-4 text-center bg-yellow-50 hover:bg-yellow-100 transition">
                <span className="text-xl">🕉️</span>
                <p className="font-semibold mt-2">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-orange-600 mb-4 text-center">Why Choose Us</h2>
        <ul className="grid md:grid-cols-2 gap-4 list-disc pl-5 text-gray-700">
          <li>Experienced and verified priests.</li>
          <li>Flexible date/time scheduling.</li>
          <li>Customizable rituals based on your needs.</li>
          <li>Affordable and transparent pricing.</li>
        </ul>
      </section>

      
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">Request a Priest</h2>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="name" required placeholder="Full Name" value={form.name} onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="email" required type="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="phone" required placeholder="Phone Number" value={form.phone} onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="location" required placeholder="Event Location" value={form.location} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <input name="date" type="date" required value={form.date} onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="time" type="time" required value={form.time} onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="priestName" placeholder="Preferred Priest (Optional)" value={form.priestName} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <select name="eventType" required value={form.eventType} onChange={handleChange} className="border p-2 rounded w-full">
              <option value="">Select Event Type</option>
              <option value="Satyanarayan Pooja">Satyanarayan Pooja</option>
              <option value="Havan">Havan</option>
              <option value="Rudrabhishek">Rudrabhishek</option>
              <option value="Grah Shanti">Grah Shanti</option>
              <option value="Mundan Sanskar">Mundan Sanskar</option>
              <option value="Other">Other</option>
            </select>
            <input name="budget" placeholder="Approx Budget (INR)" value={form.budget} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>

          <textarea name="message" rows="4" placeholder="Any additional details..." value={form.message} onChange={handleChange} className="border p-2 rounded w-full" />

          <div className="text-center">
            <button type="submit" className="bg-orange-600 text-white px-8 py-2 rounded hover:bg-orange-700 transition">
              Submit Request
            </button>
          </div>
        </form>
      </section>

    
    </div>
  );
};

export default PriestService;
