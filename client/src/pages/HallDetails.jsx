import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { rooms, roomAmenityIcons } from "../assets/assets";
import { motion } from "framer-motion";

const HallDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const foundRoom = rooms.find((room) => room._id === id);
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images[0]);
    }
  }, [id]);

  if (!room) return <div className="text-center py-32 text-xl text-gray-500">Hall not found</div>;

  return (
    <div className="bg-white font-sans text-gray-900">
     
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-[500px] mt-5" 
      >
        <img
          src={mainImage}
          alt="Main Hall"
          className="w-full h-full object-cover "
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-10">
          <h1 className="text-4xl font-bold text-white drop-shadow">{room.name}</h1>
          <p className="text-blue-200 text-lg font-medium mt-2"> 20% Discount This Week</p>
        </div>
      </motion.div>

    
      {room.images.length > 1 && (
        <div className="px-6 mt-6 flex gap-3 overflow-x-auto">
          {room.images.map((img, i) => (
            <img
              key={i}
              onClick={() => setMainImage(img)}
              src={img}
              className={`h-24 w-36 object-cover rounded-md border-2 transition-transform duration-300 cursor-pointer ${
                mainImage === img ? "border-orange-700 scale-105" : "border-gray-200"
              }`}
              alt="Thumbnail"
            />
          ))}
        </div>
      )}

   
      <div className="grid lg:grid-cols-3 gap-12 px-6 lg:px-20 py-16">
     
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="text-3xl font-semibold text-orange-700 mb-4">Experience Comfort & Elegance</h2>
            <p className="text-gray-600 leading-relaxed text-base">{room.description}</p>
          </div>

          <div>
            <h3 className="text-2xl font-medium text-orange-700 mb-3">Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {room.amenities.map((item, i) => {
                const Icon = roomAmenityIcons[item];
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm bg-gray-50 border p-3 rounded-lg shadow-sm"
                  >
                    {Icon && <Icon className="text-orange-700 w-5 h-5" />}
                    {item}
                  </div>
                );
              })}
            </div>
          </div>

 
          <div className="pt-6 border-t">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Managed & Hosted by</p>
                <p className="text-lg text-orange-700 font-medium">{room.hostedBy}</p>
                <p className="text-sm text-yellow-600 mt-1">⭐ {room.rating} / 5 rating</p>
              </div>
              <a
                href={`tel:${room.contactNumber}`}
                className="mt-4 md:mt-0 inline-block bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
              >
                 Call Now
              </a>
            </div>
          </div>
        </div>

      
        <div className="bg-gray-50 p-6 rounded-xl shadow-lg">
          <h3 className="text-3xl font-bold text-orange-700 mb-6">
            ₹{room.price} <span className="text-base font-normal text-gray-600">per day</span>
          </h3>
          <form className="space-y-5">
            <div>
              <label className="block text-sm mb-1">Check-In</label>
              <input type="date" className="w-full px-3 py-2 border rounded-md" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Check-Out</label>
              <input type="date" className="w-full px-3 py-2 border rounded-md" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Guests</label>
              <input type="number" placeholder="0" className="w-full px-3 py-2 border rounded-md" required />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-700 transition cursor-pointer"
            >
              Check Availability
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HallDetails;
