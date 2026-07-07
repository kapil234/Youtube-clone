import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaBookmark,
} from "react-icons/fa";

import RecommendedVideos from "../components/RecommendedVideos";
import Comments from "../components/Comments";

import { getVideo } from "../services/videoApi";

const VideoPlayer = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    loadVideo();
  }, [id]);

  const loadVideo = async () => {
    try {
      const res = await getVideo(id);

      setVideo(res.data);

      setLikes(res.data.likes || 0);
      setDislikes(res.data.dislikes || 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 text-center text-xl">
        Loading...
      </div>
    );
  }

  if (!video) {
    return (
      <div className="pt-24 text-center text-red-500">
        Video Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-6 py-5">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left */}
          <div className="lg:col-span-2">

            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
              <ReactPlayer
                src={video.videoUrl}
                controls
                width="100%"
                height="100%"
              />
            </div>

            <h1 className="text-2xl font-bold mt-5">
              {video.title}
            </h1>

            <p className="text-gray-500 mt-2">
              {video.views} views
            </p>

            <div className="flex justify-between items-center mt-6 flex-wrap gap-4">

              <div className="flex items-center gap-4">

                <img
                  src={video.channel?.logo}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h2 className="font-semibold">
                    {video.channel?.channelName}
                  </h2>

                  <p className="text-gray-500">
                    Video Creator
                  </p>
                </div>

              </div>

              <div className="flex gap-3 flex-wrap">

                <button
                  onClick={() =>
                    setLikes((prev) => prev + 1)
                  }
                  className="bg-gray-200 rounded-full px-5 py-3 flex items-center gap-2"
                >
                  <FaThumbsUp />
                  {likes}
                </button>

                <button
                  onClick={() =>
                    setDislikes((prev) => prev + 1)
                  }
                  className="bg-gray-200 rounded-full px-5 py-3 flex items-center gap-2"
                >
                  <FaThumbsDown />
                  {dislikes}
                </button>

                <button className="bg-gray-200 rounded-full px-5 py-3 flex items-center gap-2">
                  <FaShare />
                  Share
                </button>

                <button className="bg-gray-200 rounded-full px-5 py-3 flex items-center gap-2">
                  <FaBookmark />
                  Save
                </button>

              </div>

            </div>

            {/* Description */}

            <div className="bg-white rounded-xl border mt-8 p-6">

              <h2 className="font-semibold text-lg">
                Description
              </h2>

              <p className="mt-3">
                {video.description}
              </p>

            </div>

            {/* Comments */}

            <Comments videoId={id} />

          </div>

          {/* Right */}

          <div className="sticky top-20 self-start">

            <RecommendedVideos
              currentVideo={id}
            />

          </div>

        </div>

      </div>
    </div>
  );
};

export default VideoPlayer;
