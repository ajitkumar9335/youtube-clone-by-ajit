import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axiosConfig";

export default function VideoPlayer() {
  const { slug } = useParams(); // ⭐ using slug instead of ID

  const [video, setVideo] = useState(null);
  const [recommended, setRecommended] = useState([]);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  // COMMENTS
  const [newComment, setNewComment] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // FETCH VIDEO BY SLUG + RECOMMENDED
  useEffect(() => {
    api.get(`/slug/${slug}`).then((res) => {
      setVideo(res.data);
      setLikes(res.data.likes?.length || 0);
      setDislikes(res.data.dislikes?.length || 0);
    });

    api.get(`/`).then((res) => setRecommended(res.data));
  }, [slug]);

  if (!video) return <div className="p-10 text-center">Loading...</div>;

  // LIKE VIDEO
  const handleLike = async () => {
    try {
      const res = await api.post(`/like/${video._id}`);
      setLikes(res.data.likes.length);
      setDislikes(res.data.dislikes.length);
    } catch (err) {
      console.error("LIKE ERROR:", err);
    }
  };

  // DISLIKE VIDEO
  const handleDislike = async () => {
    try {
      const res = await api.post(`/dislike/${video._id}`);
      setLikes(res.data.likes.length);
      setDislikes(res.data.dislikes.length);
    } catch (err) {
      console.error("DISLIKE ERROR:", err);
    }
  };

  // ADD COMMENT
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await api.post(`/${video._id}/comments`, {
        text: newComment,
        username: "User",
      });

      setVideo((prev) => ({
        ...prev,
        comments: [...prev.comments, res.data],
      }));

      setNewComment("");
    } catch (err) {
      console.error("ADD COMMENT ERROR:", err);
    }
  };

  // EDIT COMMENT
  const handleEdit = (comment) => {
    setEditId(comment._id);
    setEditText(comment.text);
  };

  // SAVE EDIT COMMENT
  const handleSave = async (cid) => {
    try {
      await api.put(`/${video._id}/comments/${cid}`, { text: editText });

      setVideo((prev) => ({
        ...prev,
        comments: prev.comments.map((c) =>
          c._id === cid ? { ...c, text: editText } : c
        ),
      }));

      setEditId(null);
      setEditText("");
    } catch (err) {
      console.error("SAVE COMMENT ERROR:", err);
    }
  };

  // DELETE COMMENT
  const handleDelete = async (cid) => {
    try {
      await api.delete(`/${video._id}/comments/${cid}`);

      setVideo((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c._id !== cid),
      }));
    } catch (err) {
      console.error("DELETE COMMENT ERROR:", err);
    }
  };

  return (
    <div className="flex gap-6 px-8 py-6 bg-white">

      {/* LEFT SIDE */}
      <div className="flex-1">

        {/* VIDEO */}
        <div className="rounded-xl overflow-hidden shadow-sm">
          <video
            controls
            src={video.videoUrl}
            className="w-full"
            style={{ aspectRatio: "16/9" }}
          ></video>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold mt-4">{video.title}</h1>

        {/* CHANNEL INFO */}
        <div className="flex items-center mt-4">
          <Link
            to={`/channel/${video.channelId}`}
            className="flex items-center gap-4 hover:opacity-80 transition"
          >
            <img
              src={"/default-channel.png"}
              className="w-12 h-12 rounded-full"
              alt=""
            />

            <div>
              <p className="font-semibold text-lg">{video.channelId}</p>
              <p className="text-sm text-gray-600">10K subscribers</p>
            </div>
          </Link>

          <button className="ml-4 bg-black text-white px-5 py-2 rounded-full hover:opacity-90">
            Subscribe
          </button>
        </div>

        {/* LIKE & DISLIKE */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 bg-gray-100 px-5 py-2 rounded-full border"
          >
            👍 {likes}
          </button>

          <button
            onClick={handleDislike}
            className="flex items-center gap-2 bg-gray-100 px-5 py-2 rounded-full border"
          >
            👎 {dislikes}
          </button>

          <button className="bg-gray-100 px-5 py-2 rounded-full border flex items-center gap-2">
            🔗 Share
          </button>

          <button className="bg-gray-100 px-5 py-2 rounded-full border flex items-center gap-2">
            ⬇️ Download
          </button>
        </div>

        {/* VIEWS + DATE */}
        <p className="text-sm text-gray-600 mt-3">
          {video.views} views • {video.uploadDate}
        </p>

        {/* DESCRIPTION */}
        <div className="bg-gray-100 p-4 rounded-xl mt-4 shadow-sm text-sm leading-relaxed">
          {video.description}
        </div>

        {/* COMMENTS */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">
            {video.comments?.length || 0} Comments
          </h2>

          {/* ADD COMMENT */}
          <div className="flex gap-4 mb-6">
            <img src="/default-user.png" className="w-10 h-10 rounded-full" />

            <div className="flex-1">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
              />

              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => setNewComment("")}
                  className="px-4 py-1 text-sm rounded-full hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className={`px-4 py-1 text-sm rounded-full text-white ${
                    newComment.trim()
                      ? "bg-black hover:opacity-90"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>

          {/* COMMENT LIST */}
          {video.comments?.map((comment) => (
            <div key={comment._id} className="flex gap-4 mb-6">
              <img src="/default-user.png" className="w-10 h-10 rounded-full" />

              <div className="flex-1">

                <div className="flex items-center gap-3">
                  <p className="font-semibold text-sm">
                    {comment.username || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.timestamp).toDateString()}
                  </p>
                </div>

                {/* EDIT MODE */}
                {editId === comment._id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full border-b border-gray-400 outline-none mt-1"
                  />
                ) : (
                  <p className="text-sm mt-1">{comment.text}</p>
                )}

                <div className="flex gap-4 mt-1 text-xs text-gray-500">
                  <button onClick={() => handleEdit(comment)}>Edit</button>
                  <button onClick={() => handleDelete(comment._id)}>Delete</button>
                </div>

                {editId === comment._id && (
                  <button
                    onClick={() => handleSave(comment._id)}
                    className="text-sm mt-2 bg-black text-white px-3 py-1 rounded-full"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE — Recommended */}
      <div className="w-[350px] max-h-[80vh] overflow-y-auto">
        {recommended
          .filter((v) => v.slug !== slug)
          .map((v) => (
            <Link
              to={`/${v.slug}`}
              key={v._id}
              className="flex gap-3 mb-5 hover:bg-gray-100 p-2 rounded-xl"
            >
              <img
                src={v.thumbnailUrl}
                className="w-40 h-24 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-sm">{v.title}</h3>
                <p className="text-xs text-gray-600">{v.channelId}</p>
                <p className="text-xs text-gray-500">
                  {v.views} views • {v.uploadDate}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
