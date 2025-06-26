import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { missionCards } from "../../assets/assets";

const AboutSection = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;

    const scroll = () => {
      scrollContainer.scrollLeft += 1;

      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto bg-white text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-red-700 mb-4">About Us</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Shri Bangalore Gujarati Brahm Samaj Trust is where culture meets
          community. We celebrate our values, support each other, and grow
          together.
        </p>
      </motion.div>

      <div
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide w-full h-[300px] space-x-6"
      >
      {[...missionCards, ...missionCards].map((point, index) => {
  const Icon = point.icon;
  return (
    <div
      key={index}
      className="inline-block min-w-[300px] max-w-[300px] mx-3 bg-yellow-100 p-6 rounded-3xl shadow-lg text-center border border-yellow-100"
    >
      <div className="flex justify-center mb-3">
        <Icon className="text-4xl text-red-600 mb-3" />
      </div>
      <h3 className="text-2xl font-semibold text-red-700 mb-3">
        {point.title}
      </h3>
      <p className="text-gray-700 text-base">{point.description}</p>
    </div>
  );
})}

      </div>

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Join our vibrant community and be a part of cultural celebration,
          social harmony, and meaningful impact in Bengaluru.
        </p>
        <a
          href="/join"
          className="inline-block mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-md"
        >
          Join the Samaj
        </a>
      </motion.div>
    </div>
  );
};

export default AboutSection;
