import React from "react";
import { features } from "../../assets/assets";

const FeaturesSection = () => {
  return (
    <div className="py-16 px-6 bg-yellow-50 text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-red-700 mb-12">Main Features</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] duration-300 w-full max-w-sm"
            >
              <img
                src={item.image}
                alt={item.feature}
                className="w-full h-48 object-cover"
              />

              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-red-700 mb-2">
                  {item.feature}
                </h3>
                <p className="text-gray-700 text-sm">{item.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
