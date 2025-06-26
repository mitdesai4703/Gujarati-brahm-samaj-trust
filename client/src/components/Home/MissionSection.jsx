import React from "react";
import { missionGujarati } from "../../assets/assets";

const MissionSection = () => {
  return (
    <div className="bg-yellow-100 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-red-700 mb-8">Our Mission</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {missionGujarati.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white flex items-center p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
              >
                <Icon className="text-red-600 text-2xl mr-4" />
                <p className="text-gray-800 text-lg text-left">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
