import React from "react";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <div className="w-full cursor-pointer">

      {/* THUMBNAIL SECTION */}
      <Link to={`/watch/${video._id}`} className="relative block rounded-xl overflow-hidden">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-52 object-cover rounded-xl"
        />       
      </Link>

      {/* VIDEO DETAILS */}
      <div className="flex mt-3 gap-3">

        {/* CHANNEL PROFILE */}
        <Link to={`/channel/${video.channelId}`}>
          <img
            src={video.channelAvatar || "/default-channel.png"}
            className="w-10 h-10 rounded-full"
          />
        </Link>

        <div className="flex-1">

  {/* Title */}
  <Link to={`/watch/${video._id}`}>
    <h3 className="font-semibold text-sm line-clamp-2 hover:text-red-600">
      {video.title}
    </h3>
  </Link>

  {/* CHANNEL NAME HERE */}
  <span>
  <p className="text-sm text-gray-500">
    {video.channelName || video.channelId || "Unknown Channel"}
  </p>
  hii
</span>

  {/* Views + Time */}
  <p className="text-gray-500 text-xs mt-1">
    {video.views.toLocaleString()} views • {video.uploadDate}
  </p>
</div>
      </div>
    </div>
  );
}
