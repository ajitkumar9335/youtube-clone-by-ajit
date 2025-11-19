import React from "react";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <div className="w-full cursor-pointer">

      {/* THUMBNAIL */}
      <Link to={`/${video.slug}`} className="relative block rounded-xl overflow-hidden">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-52 object-cover rounded-xl"
        />
      </Link>

      {/* DETAILS */}
      <div className="flex mt-3 gap-3">

        {/* CHANNEL IMAGE */}
        <Link to={`/channel/${video.channelId}`}>
          <img
            src="/default-channel.png"
            className="w-10 h-10 rounded-full"
            alt="channel avatar"
          />
        </Link>

        <div className="flex-1">

          {/* TITLE */}
          <Link to={`/${video.slug}`}>
            <h3 className="font-semibold text-sm line-clamp-2 hover:text-red-600">
              {video.title}
            </h3>
          </Link>

          {/* CHANNEL NAME */}
          <Link to={`/channel/${video.channelId}`}>
            <p className="text-sm text-gray-500">
              {video.channelId || "Unknown Channel"}
            </p>
          </Link>

          {/* VIEWS + DATE */}
          <p className="text-gray-500 text-xs mt-1">
            {video.views?.toLocaleString()} views • {video.uploadDate}
          </p>

        </div>
      </div>
    </div>
  );
}
