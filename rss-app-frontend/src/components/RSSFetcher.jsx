import { useState } from "react";
import axios from "axios";

const RSSFetcher = () => {
  const [url, setUrl] = useState("");
  const [rssFeed, setRssFeed] = useState([]);
  const [error, setError] = useState("");

  const fetchRSS = async () => {
    try {
      setError("");
      setRssFeed([]);

      const response = await axios.get(`http://localhost:8000/generate-rss?url=${url}/feed`);

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setRssFeed(response.data.rss_feed);
      }
    } catch (err) {
      setError("Failed to fetch RSS feed. Make sure the URL is valid.");
    }
  };

  return (
    <div className="p-6 max-w-6xl w-full mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">RSS Feed Generator</h2>
        <div className="flex justify-center mb-6">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter RSS feed URL"
                className="p-3 border border-blue-400 rounded-lg w-full max-w-md focus:ring focus:ring-blue-300 outline-none"
            />
            <button
                onClick={fetchRSS}
                className="ml-5 px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition outline-none"
            >
                Generate
            </button>
        </div>


      {error && <p className="text-red-500 text-center">{error}</p>}

      {rssFeed.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rssFeed.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
              <div className="p-4">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold text-lg hover:underline">
                  {item.title}
                </a>
                <p className="text-gray-500 text-sm mt-2">{item.published_date}</p>
                <p className="text-gray-700 mt-2 text-sm line-clamp-3">{item.description}</p>
              </div>  
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RSSFetcher;
