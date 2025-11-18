import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axiosConfig";

export default function ChannelPage() {
  const { channelId } = useParams();

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("latest");

  // Fetch channel + videos
  useEffect(() => {
    const loadChannel = async () => {
      try {
        const res = await api.get(`/channels/${channelId}`);
        setChannel(res.data.channel);
        setVideos(res.data.videos);
      } catch (err) {
        console.error("CHANNEL FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    loadChannel();
  }, [channelId]);

  if (loading) return <div className="text-center text-xl mt-10">Loading...</div>;

  // FILTERING
  const filteredVideos = [...videos].sort((a, b) => {
    if (filter === "latest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (filter === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (filter === "popular") return b.views - a.views;
    return 0;
  });

  return (
    <div className="bg-white text-black min-h-screen pb-24">

      {/* Banner */}
      <div className="w-full h-64 bg-gray-200"></div>

      {/* Channel Info */}
      <div className="px-12 -mt-20 flex gap-6 items-center">
        {/* Avatar */}
        <img
          src={channel?.avatar || "/default-channel.png"}
          className="w-32 h-32 rounded-full border-4 border-white shadow"
        />

        <div>
          <h1 className="text-4xl font-bold">{channel?.channelName}</h1>

          <p className="text-gray-600 mt-1">
            @{channel?.username || channel?.channelName} • {channel?.subscribers || "0"} subscribers •{" "}
            {videos.length} videos
          </p>

          <p className="text-gray-600 mt-2">
            {channel?.description || "This channel has no description."}
          </p>

          <button className="mt-4 px-6 py-2 bg-black text-white rounded-full font-semibold">
            Subscribe
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-10 px-12 mt-10 border-b pb-3">
        {["Home", "Videos", "Shorts", "Playlists", "Posts"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-lg ${
              tab === "Videos"
                ? "border-b-2 border-black font-bold"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}

        <div className="ml-auto">
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-2 rounded bg-gray-100 border"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 px-12 mt-6">
        {["latest", "popular", "oldest"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-6 py-2 rounded-full border ${
              filter === item
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300"
            }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-12 mt-8 pb-24">
        {filteredVideos.map((video) => (
          <Link
            to={`/watch/${video._id}`}
            key={video._id}
            className="hover:bg-gray-100 p-2 rounded-lg transition"
          >
            <img
              src={video.thumbnailUrl}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h3 className="mt-2 font-semibold text-lg line-clamp-2">
              {video.title}
            </h3>

            <p className="text-gray-600 text-sm">
              {video.views} views • {new Date(video.uploadDate).toDateString()}
            </p>
          </Link>
        ))}

        {/* No videos */}
        {filteredVideos.length === 0 && (
          <p className="text-gray-500 text-lg col-span-full text-center mt-10">
            No videos found for this channel.
          </p>
        )}
      </div>
    </div>
  );
}
