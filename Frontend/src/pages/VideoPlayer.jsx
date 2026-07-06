import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaBookmark,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { getVideo } from "../../services/videoApi";

import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from "../../services/commentApi";

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
    if (
      !window.confirm(
        "Delete this comment?"
      )
    )
      return;

    try {
      await deleteComment(
        commentId,
        user.token
      );

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
      <div className="pt-24 text-center text-2xl">
        Loading...
      </div>
    );
  }

  if (!video) {
    return (
      <div className="pt-24 text-center text-red-500 text-2xl">
        Video Not Found
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pt-20">
      <div className="max-w-7xl mx-auto px-5">

        {/* Video */}

        <video
          controls
          src={video.videoUrl}
          className="w-full rounded-xl bg-black"
        />

        {/* Title */}

        <h1 className="text-3xl font-bold mt-6">
          {video.title}
        </h1>

        {/* Views */}

        <p className="text-gray-400 mt-2">
          {video.views} Views
        </p>

        {/* Channel */}

        <div className="flex justify-between items-center flex-wrap gap-5 mt-8">

          <div className="flex items-center gap-4">

            <img
              src={
                video.owner?.avatar ||
                "https://i.pravatar.cc/100"
              }
              alt="avatar"
              className="w-14 h-14 rounded-full object-cover"
            />

            <div>

              <h2 className="font-semibold text-lg">
                {video.owner?.username}
              </h2>

              <p className="text-gray-400">
                Video Creator
              </p>

            </div>

          </div>

          {/* Action Buttons */}

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => setLikes(likes + 1)}
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-full"
            >
              <FaThumbsUp />

              {likes}
            </button>

            <button
              onClick={() => setDislikes(dislikes + 1)}
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-full"
            >
              <FaThumbsDown />

              {dislikes}
            </button>

            <button
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-full"
            >
              <FaShare />

              Share
            </button>

            <button
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-full"
            >
              <FaBookmark />

              Save
            </button>

          </div>

        </div>

        {/* Description */}

        <div className="bg-zinc-900 rounded-xl p-6 mt-8">

          <h2 className="text-xl font-semibold mb-3">
            Description
          </h2>

          <p className="text-gray-300 leading-7">
            {video.description}
          </p>

        </div>

        {/* Comments */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5">
            {comments.length} Comments
          </h2>

          {/* Add Comment */}

          {user ? (

            <>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                placeholder="Write a comment..."
                className="w-full bg-zinc-900 rounded-xl p-4 outline-none resize-none"
              />

              <button
                onClick={submitComment}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg mt-4"
              >
                Add Comment
              </button>
            </>

          ) : (

            <p className="text-gray-400">
              Login to add a comment.
            </p>

          )}

          {/* Comments List */}

          <div className="space-y-5 mt-8">

            {comments.length === 0 && (
              <p className="text-gray-500">
                No comments yet.
              </p>
            )}

            {comments.map((item) => (

              <div
                key={item._id}
                className="bg-zinc-900 rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <img
                    src={
                      item.owner?.avatar ||
                      "https://i.pravatar.cc/100"
                    }
                    alt=""
                    className="w-12 h-12 rounded-full"
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
                            setEditText(
                              e.target.value
                            )
                          }
                          className="w-full bg-zinc-800 rounded p-3 mt-3"
                        />

                        <div className="flex gap-3 mt-3">

                          <button
                            onClick={() =>
                              saveComment(
                                item._id
                              )
                            }
                            className="bg-green-600 px-4 py-2 rounded"
                          >
                            Save
                          </button>

                          <button
                            onClick={() => {
                              setEditingId(
                                null
                              );
                              setEditText("");
                            }}
                            className="bg-gray-600 px-4 py-2 rounded"
                          >
                            Cancel
                          </button>

                        </div>
                      </>

                    ) : (

                      <>
                        <p className="text-gray-300 mt-2">
                          {item.text}
                        </p>

                        {user &&
                          item.owner &&
                          item.owner._id ===
                            user._id && (

                            <div className="flex gap-5 mt-4">

                              <button
                                onClick={() => {
                                  setEditingId(
                                    item._id
                                  );

                                  setEditText(
                                    item.text
                                  );
                                }}
                                className="text-blue-400 hover:text-blue-300"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() =>
                                  removeComment(
                                    item._id
                                  )
                                }
                                className="text-red-500 hover:text-red-400"
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
    </div>
  );
};

export default VideoPlayer;