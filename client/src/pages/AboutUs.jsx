import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
   
      <section className="bg-gradient-to-r from-yellow-100 to-orange-200 py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-800 mb-4">
            About Shri Bangalore Gujarati Brahm Samaj Trust
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            A non-profit community dedicated to preserving our Gujarati Brahmin heritage and serving the people of Bengaluru through culture, education, and values.
          </p>
        </div>
      </section>

      <section className="py-14 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-orange-700">Who We Are</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The Shri Bangalore Gujarati Brahm Samaj Trust is a dedicated organization committed to the social, cultural, educational, and spiritual upliftment of the Gujarati Brahmin community in Bengaluru. While embracing the spirit of this vibrant city, we cherish our distinct identity and values.
          </p>
        </div>
      </section>

     
      <section className="py-14 px-6 md:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-8">
          <h2 className="text-3xl font-semibold text-orange-700">Our Purpose</h2>
          <div className="space-y-6 text-lg text-gray-700">
            <div>
              <strong className="text-orange-700">Promote Unity and Fellowship:</strong>  
              <p>We foster a strong sense of togetherness by organizing community gatherings, social meetups, and group interactions that help build lasting bonds.</p>
            </div>
            <div>
              <strong className="text-orange-700">Preserve and Promote Cultural Heritage:</strong>  
              <p>We celebrate Gujarati traditions through festivals, language events, music, and educational activities that keep our rich culture alive.</p>
            </div>
            <div>
              <strong className="text-orange-700">Support Educational Advancement:</strong>  
              <p>We encourage academic excellence by supporting students through initiatives, resources, and educational guidance.</p>
            </div>
            <div>
              <strong className="text-orange-700">Uphold Spiritual Values:</strong>  
              <p>We organize religious discussions, bhajans, and spiritual events to keep our values and beliefs rooted and alive.</p>
            </div>
            <div>
              <strong className="text-orange-700">Engage in Social Welfare:</strong>  
              <p>We actively participate in charitable and social causes, contributing to the betterment of society beyond our community.</p>
            </div>
          </div>
        </div>
      </section>

    
      <section className="py-14 px-6 md:px-20 bg-orange-50 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-700 mb-4">Join Our Community</h2>
          <p className="text-lg text-gray-700 mb-6">
            We invite all Gujarati Brahmins in Bengaluru to become a part of our Samaj. Let’s preserve our culture and grow together for a brighter future.
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200">
            Become a Member
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
