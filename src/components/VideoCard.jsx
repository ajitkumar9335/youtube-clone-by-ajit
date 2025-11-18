import React from "react";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <div className="rounded-lg overflow-hidden hover:shadow-lg transition bg-white">
      
      {/* Thumbnail → Watch Page */}
      <Link to={`/watch/${video._id}`}>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-48 object-cover"
        />
      </Link>

      {/* Video Details */}
      <div className="p-3">

        {/* Title */}
        <Link to={`/watch/${video._id}`}>
          <h3 className="font-semibold text-sm line-clamp-2 hover:text-red-600">
            {video.title}
          </h3>
        </Link>

        {/* Channel Name → Channel Page */}
        <Link to={`/channel/${video.channelId}`}>
  {video.channelId}
</Link>


        {/* Views */}
        <p className="text-gray-500 text-xs mt-1">
          {video.views} views
        </p>

      </div>
    </div>
  );
}
