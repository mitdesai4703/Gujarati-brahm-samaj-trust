import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-yellow-100 text-gray-700 pt-12 pb-6 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Gujarati Brahm Samaj Trust
          </h2>
          <p className="text-sm">
            Serving the community with dedication and cultural pride. Join us in
            preserving traditions and supporting growth.
          </p>
          <div className="flex gap-4 mt-4 text-gray-600">
            <FaInstagram className="hover:text-indigo-600 cursor-pointer" />
            <FaFacebookF className="hover:text-indigo-600 cursor-pointer" />
            <FaTwitter className="hover:text-indigo-600 cursor-pointer" />
            <FaLinkedinIn className="hover:text-indigo-600 cursor-pointer" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <ul className="text-sm space-y-1">
            <li>
              <a href="#">Mission</a>
            </li>
            <li>
              <a href="#">Events</a>
            </li>
            <li>
              <a href="#">Media</a>
            </li>
            <li>
              <a href="#">Gallery</a>
            </li>
            <li>
              <a href="#">Trustees</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Support</h3>
          <ul className="text-sm space-y-1">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Donations</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Accessibility</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
          <p className="text-sm mb-2">
            Subscribe to our newsletter for latest updates and cultural events.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 flex-grow rounded-l-md border border-gray-300 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 rounded-r-md hover:bg-gray-800"
            >
              →
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-300 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Gujarati Brahm Samaj Trust. All rights
        reserved.
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
