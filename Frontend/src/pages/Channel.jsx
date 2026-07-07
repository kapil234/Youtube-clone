import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChannel } from "../services/channelApi";
import VideoCard from "../components/VideoCard";
import { FaEllipsisV } from "react-icons/fa";

const tabs = [
  "Home",
  "Videos",
  "Shorts",
  "Live",
  "Playlists",
  "Community",
];

const filters = ["Latest", "Popular", "Oldest"];

const Channel = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("Videos");
  const [activeFilter, setActiveFilter] = useState("Latest");

  useEffect(() => {
    loadChannel();
  }, [id]);

  const loadChannel = async () => {
    const res = await getChannel(id);
    setData(res.data);
  };

  if (!data) {
    return (
      <div className="pt-24 text-center text-xl">
        Loading...
      </div>
    );
  }

  const { channel, videos } = data;

  let filteredVideos = [...videos];

  if (activeFilter === "Popular") {
    filteredVideos.sort((a, b) => b.views - a.views);
  }

  if (activeFilter === "Oldest") {
    filteredVideos.sort(
      (a, b) =>
        new Date(a.createdAt) -
        new Date(b.createdAt)
    );
  }

  if (activeFilter === "Latest") {
    filteredVideos.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );
  }

  return (
    <div className="pt-6">
      {/* Banner */}

      <div className="max-w-7xl mx-auto px-6 mt-4">
        <img
          src={channel.banner}
          alt=""
          className="w-full h-56 rounded-2xl object-cover"
        />
      </div>

      {/* Channel Info */}

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="flex items-center gap-6">
          <img
            src={channel.logo}
            alt=""
            className="w-40 h-40 rounded-full border object-cover"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-bold">
              {channel.channelName}
            </h1>

            <p className="text-gray-600 mt-2">
              @{channel.channelName
                .replace(/\s/g, "")
                .toLowerCase()}
            </p>

            <p className="text-gray-500 mt-1">
              {channel.subscribers.toLocaleString()} subscribers •{" "}
              {videos.length} videos
            </p>

            <p className="text-gray-700 mt-3 max-w-3xl">
              {channel.description}
            </p>

            <button className="mt-5 bg-black text-white px-6 py-3 rounded-full hover:bg-zinc-800">
              Subscribe
            </button>
          </div>
        </div>

        {/* Tabs */}

        <div className="flex gap-8 border-b mt-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters */}

        {activeTab === "Videos" && (
          <>
            <div className="flex gap-3 mt-6">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveFilter(item)}
                  className={`px-5 py-2 rounded-lg text-sm ${
                    activeFilter === item
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Videos */}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 pb-10">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video._id}
                  video={video}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Channel;