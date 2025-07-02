import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsPage = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/news`);
        setNewsList(res.data);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
        Trust Blog & News
      </h1>

      {newsList.length === 0 ? (
        <p className="text-center text-gray-500">No news available</p>
      ) : (
        <div className="space-y-16">
          {newsList.map((news) => (
            <div
              key={news._id}
              className="group relative flex flex-col md:flex-row gap-8 items-start transition duration-300 hover:shadow-lg p-4 rounded-xl border border-gray-200"
            >
          
              {news.image && (
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full md:w-1/3 h-60 object-cover rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105"
                />
              )}

           
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">
                  {new Date(news.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors">
                  {news.title}
                </h2>
                {news.summary && (
                  <p className="text-gray-600 mb-4">{news.summary}</p>
                )}

                {news.content && (
                  <details className="text-sm text-blue-700 cursor-pointer">
                    <summary className="hover:underline">Read full article</summary>
                    <p className="mt-2 text-gray-700 whitespace-pre-line">
                      {news.content}
                    </p>
                  </details>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;
