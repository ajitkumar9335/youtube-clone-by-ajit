const [likes, setLikes] = useState(video.likes.length);
const [dislikes, setDislikes] = useState(video.dislikes.length);

const handleLike = async () => {
  try {
    const res = await api.post(`/videos/like/${video._id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    setLikes(res.data.likes);
    setDislikes(res.data.dislikes);
  } catch (err) {
    console.error("LIKE ERROR:", err);
  }
};
