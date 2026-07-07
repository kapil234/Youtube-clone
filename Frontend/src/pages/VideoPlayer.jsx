
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import toast from "react-hot-toast";

import {
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaBookmark,
} from "react-icons/fa";

import RecommendedVideos from "../components/RecommendedVideos";

import { useAuth } from "../context/AuthContext";
import { getVideo } from "../services/videoApi";

import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from "../services/commentApi";
const VideoPlayer = () => {
  const { id } = useParams();
  const { user } = useAuth();
const [video, setVideo] = useState(null);
const [loading, setLoading] = useState(true);

const [likes, setLikes] = useState(0);
const [dislikes, setDislikes] = useState(0);

const [comments, setComments] = useState([]);

const [comment, setComment] = useState("");

const [editingId, setEditingId] = useState(null);
const [editText, setEditText] = useState("");
useEffect(() => {
  loadVideo();
  loadComments();
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
const loadComments = async () => {
  try {
    const res = await getComments(id);
    setComments(res.data);
  } catch (err) {
    console.log(err);
  }
};
 const submitComment = async () => {
    if (!user) {
      toast.error("Please Login First");
      return;
    }

    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      await addComment(
        {
          text: comment,
          video: id,
        },
        user.token
      );

      toast.success("Comment Added");
      setComment("");
      loadComments();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to add comment"
      );
    }
  };

  const saveComment = async (commentId) => {
    try {
      await updateComment(
        commentId,
        {
          text: editText,
        },
        user.token
      );

      toast.success("Comment Updated");
      setEditingId(null);
      setEditText("");
      loadComments();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Update Failed"
      );
    }
  };

  const removeComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await deleteComment(commentId, user.token);

      toast.success("Comment Deleted");

      loadComments();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Delete Failed"
      );
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

        {/* Left Side */}
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
                onClick={() => setLikes(likes + 1)}
                className="bg-gray-200 rounded-full px-5 py-3 flex items-center gap-2"
              >
                <FaThumbsUp />
                {likes}
              </button>

              <button
                onClick={() => setDislikes(dislikes + 1)}
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
          <div className="mt-10">

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {comments.length} Comments
            </h2>

            {user ? (
              <div className="bg-white border rounded-xl p-5 shadow-sm">

                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a public comment..."
                  className="w-full border rounded-lg p-4 outline-none resize-none focus:ring-2 focus:ring-red-500"
                />

                <div className="flex justify-end mt-4">
                  <button
                    onClick={submitComment}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full"
                  >
                    Comment
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-white border rounded-xl p-5 text-gray-600">
                Login to add a comment.
              </div>
            )}

            <div className="space-y-5 mt-8">

              {comments.length === 0 && (
                <div className="bg-white border rounded-xl p-6 text-center text-gray-500">
                  No comments yet.
                </div>
              )}

              {comments.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border rounded-xl p-5 shadow-sm"
                >
                  <div className="flex gap-4">

                    <img
                      src={
                        item.owner?.avatar ||
                        "https://i.pravatar.cc/100"
                      }
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold">
                        {item.owner?.username}
                      </h3>

                      {editingId === item._id ? (
                        <>
                          <textarea
                            value={editText}
                            onChange={(e) =>
                              setEditText(e.target.value)
                            }
                            rows={3}
                            className="w-full border rounded-lg p-3 mt-3"
                          />

                          <div className="flex gap-3 mt-4">

                            <button
                              onClick={() =>
                                saveComment(item._id)
                              }
                              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                            >
                              Save
                            </button>

                            <button
                              onClick={() => {
                                setEditingId(null);
                                setEditText("");
                              }}
                              className="bg-gray-300 px-5 py-2 rounded-lg"
                            >
                              Cancel
                            </button>

                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-gray-700 mt-2">
                            {item.text}
                          </p>

                          {user &&
                            item.owner &&
                            item.owner._id === user._id && (
                              <div className="flex gap-5 mt-4">

                                <button
                                  onClick={() => {
                                    setEditingId(item._id);
                                    setEditText(item.text);
                                  }}
                                  className="text-blue-600 hover:underline"
                                >
                                  Edit
                                </button>

                                <button
                                  onClick={() =>
                                    removeComment(item._id)
                                  }
                                  className="text-red-600 hover:underline"
                                >
                                  Delete
                                </button>

                              </div>
                            )}
                        </>
                      )}

                    </div>
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="sticky top-20 self-start">
          <RecommendedVideos currentVideo={id} />
        </div>

      </div>
    </div>
  </div>
);
}
export default VideoPlayer;
