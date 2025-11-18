import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import VideoCard from "../components/VideoCard";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const { searchText, sidebarOpen } = useOutletContext();

  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState("all");

  const filters = [
    "all",
    "music",
    "gaming",
    "tech",
    "news",
    "movies",
    "food",
    "fitness",
    "comedy"
  ];

  // FETCH VIDEOS WHEN CATEGORY OR SEARCH CHANGES
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchText) params.set("search", searchText);
    if (category !== "all") params.set("category", category);

    api
      .get(`/videos?${params.toString()}`)
      .then((res) => setVideos(res.data))
      .catch((err) => console.error(err));
  }, [searchText, category]);

  return (
    <div
      className={`px-2 transition-all duration-300 
      ${sidebarOpen ? "ml-20" : "ml-20"}`}
    >

      {/* FILTER BAR */}
      <div className="flex gap-3 overflow-x-auto whitespace-nowrap py-2 px-4 bg-white sticky top-16 z-40 shadow-sm border-b no-scrollbar">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setCategory(f)}
            className={`px-5 py-2 rounded-full text-sm capitalize
              ${
                category === f
                  ? "bg-black text-white font-medium"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }
            `}
          >
            {f}
          </button>
        ))}
      </div>

      {/* VIDEOS GRID */}
      <div
        className={`grid gap-6 mt-4 transition-all duration-300
        ${
          sidebarOpen
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {videos.map((v) => (
          <VideoCard key={v._id} video={v} />
        ))}
      </div>
    </div>
  );
}
