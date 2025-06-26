import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const HallCard = ({ room, index }) => {
  if (!room) return null;

  return (
    <Link to={`/hall/${room._id}`} onClick={() => scrollTo(0, 0)} key={room._id}>
      <div className="relative">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-64 object-cover rounded-t-xl"
        />

        {index % 2 === 0 && (
          <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full">
            Best Seller
          </p>
        )}
      </div>

      <div className="p-4 bg-white rounded-b-xl shadow">
        <div className="flex items-center justify-between mb-1">
          <p className="font-playfair text-xl font-medium text-gray-800">
            {room.name}
          </p>
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar className="w-4 h-4" />
            <span className="text-sm text-gray-600">{room.rating}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2">
          {room.description}
        </p>

        <p className="mt-2 text-indigo-700 font-semibold">
          ₹{room.price} / day
        </p>

  
        <div className="mt-4">
          <Link
            to={`/rooms/${room._id}`}
            className="inline-block w-full text-center bg-red-600 text-white font-medium py-2 rounded-lg hover:bg-red-700 transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default HallCard;
