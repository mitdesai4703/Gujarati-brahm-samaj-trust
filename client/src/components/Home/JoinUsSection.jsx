import React from "react";

const JoinUsSection = () => {
  return (
    <div className="py-16 px-6 bg-yellow-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-red-700 mb-4">Join Us Today!</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          If you're a Gujarati Brahmin living in Bengaluru, become a part of our community and join the journey of unity, culture, and growth.
        </p>
        <a
          href="/join"
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md"
        >
          Become a Member
        </a>
      </div>
    </div>
  );
};

export default JoinUsSection;
