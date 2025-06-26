import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
    
      <section className="bg-gradient-to-r from-yellow-100 to-orange-100 py-20 text-center px-4">
        <h1 className="text-5xl font-extrabold text-orange-700 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          We would love to hear from you. Reach out to us for any queries, participation, or suggestions.
        </p>
      </section>

    
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
       
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-orange-700">Get in Touch</h2>
            <p className="text-lg text-gray-700">
              Whether you're interested in joining the Samaj, volunteering, or learning more about our work — we're here to help.
            </p>
            <div className="space-y-4 text-lg">
              <p><strong className="text-orange-700">📍 Address:</strong> <br /> Shri Bangalore Gujarati Brahm Samaj Trust,<br /> Bengaluru, Karnataka, India</p>
              <p><strong className="text-orange-700">📞 Phone:</strong> +91-XXXXXXXXXX</p>
              <p><strong className="text-orange-700">📧 Email:</strong> info@gujaratisamajtrust.org</p>
            </div>
          </div>

       
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-orange-700">Send us a message</h3>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  rows="4"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Write your message here"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md font-semibold transition-all duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
