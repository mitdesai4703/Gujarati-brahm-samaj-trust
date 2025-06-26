import React from 'react';
import { images } from '../../assets/assets';

const HeroSection = () => {
  return (
    <div className="relative bg-yellow-100 text-center overflow-hidden min-h-[500px] flex items-center justify-center px-6">
      <img 
        src={images.heroBanner} 
        alt="Samaj Banner" 
        className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm z-0" 
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-800 mb-4">
          શ્રી બેંગલુરુ ગુજરાતી બ્રાહ્મ સમાજ ટ્રસ્ટમાં આપનું સ્વાગત છે
        </h1>
        <p className="text-lg md:text-xl text-gray-800 max-w-3xl mx-auto mb-6">
          સંસ્કૃતિ અને વારસાની સાથે એકતાનું પુલ બનાવતી સંસ્થા – જય સ્વામિનારાયણ!
        </p>
        <a
          href="/about"
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
        >
          વધુ જાણો
        </a>
      </div>
    </div>
  );
};

export default HeroSection;