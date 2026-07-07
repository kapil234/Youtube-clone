import { useEffect, useState } from "react";
import axios from "axios";
import RecommendedVideoCard from "./RecommendedVideoCard";

const RecommendedVideos = ({ currentVideo }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/videos"
      );

      const filtered = res.data.filter(
        (v) => v._id !== currentVideo
      );

      setVideos(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <RecommendedVideoCard
          key={video._id}
          video={video}
        />
      ))}
    </div>
  );
};

export default RecommendedVideos;