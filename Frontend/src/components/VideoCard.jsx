const VideoCard = ({ video }) => {
  return (
    <div className="cursor-pointer">
      {/* Thumbnail */}
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-52 object-cover rounded-xl"
      />

      {/* Video Info */}
      <div className="flex gap-3 mt-3">
        {/* Channel Avatar */}
        <img
          src={video.channelImage}
          alt={video.channel}
          className="w-10 h-10 rounded-full"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 line-clamp-2">
            {video.title}
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            {video.channel}
          </p>

          <p className="text-sm text-gray-500">
            {video.views} • {video.time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;