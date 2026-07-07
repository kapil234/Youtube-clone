import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEllipsisV,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const VideoCard = ({
  video,
  showActions = false,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] =
    useState(false);

  const formatViews = (views) => {
    if (!views) return "0 views";

    if (views >= 1000000)
      return (
        (views / 1000000).toFixed(1) + "M views"
      );

    if (views >= 1000)
      return (
        (views / 1000).toFixed(1) + "K views"
      );

    return views + " views";
  };

  const timeAgo = (date) => {
    if (!date) return "Recently";

    const now = new Date();
    const upload = new Date(date);

    const days = Math.floor(
      (now - upload) /
        (1000 * 60 * 60 * 24)
    );

    if (days < 1) return "Today";

    if (days < 30)
      return `${days} days ago`;

    const months = Math.floor(days / 30);

    if (months < 12)
      return `${months} months ago`;

    return `${Math.floor(
      months / 12
    )} years ago`;
  };

  return (
    <div
      onClick={() =>
        navigate(`/video/${video._id}`)
      }
      className="cursor-pointer group"
    >
      {/* Thumbnail */}

      <div className="relative overflow-hidden rounded-xl">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition duration-300"
        />

        <span className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded">
          {video.duration || "0:00"}
        </span>
      </div>

      {/* Info */}

      <div className="flex gap-3 mt-3">

        {/* Channel Logo */}

        <img
          src={
            video.channel?.logo ||
            "https://i.pravatar.cc/100"
          }
          alt={video.channel?.channelName}
          onClick={(e) => {
            e.stopPropagation();

            navigate(
              `/channel/${video.channel?._id}`
            );
          }}
          className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-80"
        />

        <div className="flex-1">

          <div className="flex justify-between items-start">

            <div className="flex-1">

              <h3 className="font-semibold text-[15px] leading-5 text-black line-clamp-2">
                {video.title}
              </h3>

              <p
                onClick={(e) => {
                  e.stopPropagation();

                  navigate(
                    `/channel/${video.channel?._id}`
                  );
                }}
                className="text-sm text-gray-600 mt-1 hover:text-black hover:underline cursor-pointer w-fit"
              >
                {video.channel?.channelName}
              </p>

              <p className="text-sm text-gray-500">
                {formatViews(video.views)} •{" "}
                {timeAgo(video.createdAt)}
              </p>

            </div>

            {/* Three Dots */}

            {showActions && (
              <div className="relative">

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    setShowMenu(
                      !showMenu
                    );
                  }}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FaEllipsisV />
                </button>

                {showMenu && (
                  <div className="absolute right-0 top-10 w-40 bg-white border rounded-xl shadow-xl z-50 overflow-hidden">

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        setShowMenu(false);

                        navigate(`/edit-video/${video._id}`);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                    >
                      <FaEdit />

                      Edit Video
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        setShowMenu(false);

                        onDelete(video._id);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                    >
                      <FaTrash />

                      Delete Video
                    </button>

                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default VideoCard;