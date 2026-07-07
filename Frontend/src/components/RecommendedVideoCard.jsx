import { useNavigate } from "react-router-dom";

const RecommendedVideoCard = ({ video }) => {
  const navigate = useNavigate();

  return (
    
     <div
  onClick={() => navigate(`/video/${video._id}`)}
  className="flex gap-3 mb-4 cursor-pointer hover:bg-gray-100 rounded-xl p-2 transition"
>
  <img
    src={video.thumbnail}
    alt={video.title}
    className="w-44 h-24 rounded-xl object-cover flex-shrink-0"
  />

  <div className="flex-1">
    <h3 className="font-semibold text-sm line-clamp-2">
      {video.title}
    </h3>

    <p className="text-xs text-gray-600 mt-1">
      {video.channel?.channelName}
    </p>

    <p className="text-xs text-gray-500">
      {video.views} views
    </p>
  </div>
</div>
  );
};

export default RecommendedVideoCard;