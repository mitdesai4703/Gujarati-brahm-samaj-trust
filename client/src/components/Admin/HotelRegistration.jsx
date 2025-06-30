import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { images } from "../../assets/assets";
import { AppContent, useAppContext } from "../../context/AppContext";

// Sample city list
const cityList = ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Navsari"];


const HotelRegistration = () => {
  
 const { setShowHallReg } = useAppContext();

 const [name, setName] = useState("")
 const [address, setAddress] = useState("")
 const [contact, setContact] = useState("")
 const [city, setCity] = useState("")


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <form className="flex w-full max-w-4xl bg-white rounded-xl overflow-hidden max-md:mx-2">
        {/* Image Section */}
        <div
          className="w-1/2 h-[520px] hidden md:block bg-cover bg-center"
          style={{ backgroundImage: `url(${images.regImg})` }}
        ></div>

        {/* Form Section */}
        <div className="relative flex flex-col items-center w-full md:w-1/2 p-8 md:p-10">
          <IoMdClose className="absolute top-4 right-4 h-6 w-6 text-gray-500 cursor-pointer" onClick={()=>setShowHallReg(false)} />
          <p className="text-2xl font-semibold mt-6">Register Your Hall</p>

          {/* Hall Name */}
          <div className="w-full mt-6">
            <label htmlFor="name" className="block text-gray-600 font-medium mb-1">
              Hall Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Type here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 outline-indigo-500 font-light"
              required
            />
          </div>

          {/* Phone */}
          <div className="w-full mt-6">
            <label htmlFor="contact" className="block text-gray-600 font-medium mb-1">
              Phone
            </label>
            <input
              id="contact"
              type="tel"
              placeholder="Type here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 outline-indigo-500 font-light"
              required
            />
          </div>

          {/* Address */}
          <div className="w-full mt-6">
            <label htmlFor="address" className="block text-gray-600 font-medium mb-1">
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Type here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 outline-indigo-500 font-light"
              required
            />
          </div>

          {/* Select City Dropdown */}
          <div className="w-full mt-6 max-w-60 mr-auto">
            <label htmlFor="city" className="font-medium text-gray-500">
              City
            </label>
            <select
              id="city"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            >
              <option value="">Select City</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <button className="bg-red-700 hover:bg-red-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelRegistration;
