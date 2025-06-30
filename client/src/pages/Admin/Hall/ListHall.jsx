import React, { useState } from "react";
import { rooms } from "../../../assets/assets";
import { FaEdit, FaTrash } from "react-icons/fa";

const ListHall = () => {
  const [hall, setHall] = useState(rooms);

  const handleDelete = (id) => {
    const updatedList = hall.filter((item) => item._id !== id);
    setHall(updatedList);
  };

  return (
    <div>
      <div className="mb-8 text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-2">
          Hall Listings
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl">
          View, edit, or manage all listed halls. Keep the information
          up-to-date to provide the best experience for users.
        </p>
      </div>

      <p className="text-gray-500 mt-8">All Halls</p>

      <div className="w-full max-w-5xl text-left border border-gray-300 rounded-lg max-h-[420px] overflow-y-auto mt-3">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Amenities
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Price / Day
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {hall.map((item) => (
              <tr key={item._id} className="border-t border-gray-200">
                <td className="py-3 px-4 text-gray-700">{item.name}</td>
                <td className="py-3 px-4 text-gray-700 max-sm:hidden">
                  {item.amenities?.join(", ")}
                </td>
                <td className="py-3 px-4 text-gray-700 text-center">
                  ₹{item.price}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                      onClick={() => alert(`Edit ${item.name}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                      onClick={() => handleDelete(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {hall.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="py-4 text-center text-gray-500 italic"
                >
                  No halls available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListHall;
