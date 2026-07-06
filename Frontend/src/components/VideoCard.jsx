const VideoCard = ({ video }) => {
  return (
    <div className="cursor-pointer">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="rounded-xl w-full"
      />

      <div className="mt-3">
        <h3 className="font-semibold">{video.title}</h3>

        <p className="text-gray-400">{video.channel}</p>

        <p className="text-gray-500 text-sm">{video.views}</p>
      </div>
    </div>
  );
};

export default VideoCard;