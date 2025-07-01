import React, { useState } from "react";
import { FaUpload, FaTimes } from "react-icons/fa";

const AddHall = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerDay: 0,
    amenities: {
      "Free WiFi": false,
      "Free Brekfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  return (
    <form>
     
      <div className="mb-8 text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-2">
          Add Hall
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl">
          Fill in the details carefully and provide accurate hall details,
          pricing, and amenities to enhance the user booking experience.
        </p>
      </div>

      
      <p className="text-gray-800 mt-10">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <div
            key={key}
            className="relative h-32 w-32 border border-dashed border-gray-400 rounded flex items-center justify-center hover:bg-gray-100"
          >
            {images[key] ? (
              <>
                <img
                  src={URL.createObjectURL(images[key])}
                  alt={`Preview ${key}`}
                  className="h-full w-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => setImages({ ...images, [key]: null })}
                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow text-red-600 hover:bg-red-100"
                  title="Remove image"
                >
                  <FaTimes className="text-sm" />
                </button>
              </>
            ) : (
              <label
                htmlFor={`roomImage${key}`}
                className="w-full h-full flex items-center justify-center cursor-pointer"
              >
                <FaUpload className="text-gray-500 text-2xl" />
                <input
                  type="file"
                  accept="image/*"
                  id={`roomImage${key}`}
                  hidden
                  onChange={(e) =>
                    setImages({ ...images, [key]: e.target.files[0] })
                  }
                />
              </label>
            )}
          </div>
        ))}
      </div>

   
      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Hall Type</p>
          <select
            value={inputs.hallType}
            onChange={(e) =>
              setInputs({ ...inputs, hallType: e.target.value })
            }
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
          >
            <option value="">Select Hall Type</option>
            <option value="Banquet Hall">Banquet Hall</option>
            <option value="Conference Hall">Conference Hall</option>
            <option value="Marriage Hall">Marriage Hall</option>
            <option value="Party Hall">Party Hall</option>
          </select>
        </div>

        <div>
          <p className="mt-4 text-gray-800">
            Price <span className="text-xs">/day</span>
          </p>
          <input
            type="number"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            value={inputs.pricePerDay}
            onChange={(e) =>
              setInputs({
                ...inputs,
                pricePerDay: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>
      </div>

    
      <p className="text-gray-800 mt-4">Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],
                  },
                })
              }
            />
            <label htmlFor={`amenities${index + 1}`} className="ml-2">
              {amenity}
            </label>
          </div>
        ))}
      </div>

 
      <button
        type="submit"
        className="bg-red-700 hover:bg-red-600 text-white px-8 py-2 rounded mt-8 cursor-pointer"
      >
        Add Hall
      </button>
    </form>
  );
};

export default AddHall;
