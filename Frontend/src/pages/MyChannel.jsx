import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import {
  getMyChannel,
  deleteChannel,
} from "../services/channelApi";
import { deleteVideo } from "../services/videoApi";
import VideoCard from "../components/VideoCard";
import { useVideo } from "../context/VideoContext";

const tabs = [
  "Home",
  "Videos",
  "Shorts",
  "Live",
  "Playlists",
  "Community",
];

const filters = ["Latest", "Popular", "Oldest"];

const MyChannel = () => {
 const { user, setHasChannel } = useAuth();
  const navigate = useNavigate();
const { loadVideos } = useVideo();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("Videos");
  const [activeFilter, setActiveFilter] = useState("Latest");
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (user?.token) {
      loadChannel();
    }
  }, [user]);

  const loadChannel = async () => {
    try {
      const res = await getMyChannel(user.token);

      setChannel(res.data.channel);
      setVideos(res.data.videos);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteChannel = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete your channel?\n\nAll videos will also be deleted."
  );

  if (!confirmDelete) return;

  try {
    await deleteChannel(user.token);

    // Update Header immediately
    setHasChannel(false);

    alert("Channel deleted successfully");

    navigate("/");
     
  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      "Failed to delete channel"
    );
  }
};

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmDelete) return;

    try {
      await deleteVideo(id, user.token);

      setVideos((prev) => prev.filter((video) => video._id !== id));
          await loadVideos();
      alert("Video deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to delete video");
    }
  };

  if (!channel) {
    return (
      <div className="pt-24 text-center">
        <h1 className="text-3xl font-bold">No Channel Found</h1>

        <Link
          to="/create-channel"
          className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-full"
        >
          Create Channel
        </Link>
      </div>
    );
  }

  let filteredVideos = [...videos];

  if (activeFilter === "Popular") {
    filteredVideos.sort((a, b) => b.views - a.views);
  }

  if (activeFilter === "Oldest") {
    filteredVideos.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

  if (activeFilter === "Latest") {
    filteredVideos.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  return (
    <div className="pt-6">

      {/* Banner */}
      <div className="max-w-7xl mx-auto px-6 mt-4">
        <img
          src={channel.banner}
          alt={channel.channelName}
          className="w-full h-56 rounded-2xl object-cover"
        />
      </div>

      {/* Channel Header */}
      <div className="max-w-7xl mx-auto px-8 py-8">

        <div className="flex flex-col md:flex-row gap-8">

          {/* Logo */}
          <img
            src={channel.logo}
            alt={channel.channelName}
            className="w-40 h-40 rounded-full object-cover border"
          />

          {/* Right Section */}
          <div className="flex-1">

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">

              {/* Channel Info */}
              <div>
                <h1 className="text-4xl font-bold">
                  {channel.channelName}
                </h1>

                <div className="flex flex-wrap items-center gap-2 text-gray-600 mt-2">
                  <span>
                    @{channel.channelName.replace(/\s/g, "").toLowerCase()}
                  </span>

                  <span>•</span>

                  <span>
                    {channel.subscribers.toLocaleString()} subscribers
                  </span>

                  <span>•</span>

                  <span>{videos.length} videos</span>
                </div>

                <p className="mt-4 text-gray-700 max-w-3xl">
                  {channel.description}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3">

                <button
                  onClick={() => navigate("/edit-channel")}
                  className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-full font-medium"
                >
                  Customize Channel
                </button>

                <button
                  onClick={() => navigate("/upload")}
                  className="bg-black hover:bg-zinc-800 text-white px-5 py-3 rounded-full font-medium"
                >
                  Upload Video
                </button>

                {/* Three Dot */}
                <div className="relative" ref={menuRef}>

                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="w-11 h-11 rounded-full hover:bg-gray-200 flex items-center justify-center"
                  >
                    <FaEllipsisV />
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border overflow-hidden z-50">

                      <button
                        onClick={() => {
                          setShowMenu(false);
                          navigate("/edit-channel");
                        }}
                        className="w-full text-left px-5 py-3 hover:bg-gray-100"
                      >
                        ✏️ Edit Channel
                      </button>

                      <button
                        onClick={() => {
                          setShowMenu(false);
                          handleDeleteChannel();
                        }}
                        className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50"
                      >
                        🗑 Delete Channel
                      </button>

                    </div>
                  )}

                </div>

              </div>

            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b mt-10 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === tab
                      ? "border-b-2 border-black text-black"
                      : "text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
                        {/* Videos */}
            {activeTab === "Videos" && (
              <>
                {/* Filters */}
                <div className="flex gap-3 mt-6 flex-wrap">
                  {filters.map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveFilter(item)}
                      className={`px-5 py-2 rounded-lg text-sm transition ${
                        activeFilter === item
                          ? "bg-black text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* No Videos */}
                {filteredVideos.length === 0 ? (
                  <div className="text-center py-24">
                    <h2 className="text-3xl font-bold">
                      No videos uploaded
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Upload your first video.
                    </p>

                    <Link
                      to="/upload"
                      className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition"
                    >
                      Upload Video
                    </Link>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 pb-10">
                    {filteredVideos.map((video) => (
                      <VideoCard
                        key={video._id}
                        video={video}
                        showActions={true}
                        onEdit={() =>
                          navigate(`/edit-video/${video._id}`)
                        }
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyChannel;