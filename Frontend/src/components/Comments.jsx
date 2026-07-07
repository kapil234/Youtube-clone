import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from "../services/commentApi";

import CommentCard from "./CommentCard";

const Comments = ({ videoId }) => {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [editText, setEditText] =
    useState("");

  const loadComments = async () => {
    try {
      const res = await getComments(videoId);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadComments();
  }, [videoId]);

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
          video: videoId,
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

  const saveComment = async (id) => {
    if (!editText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      await updateComment(
        id,
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

  const removeComment = async (id) => {
    if (!window.confirm("Delete Comment?"))
      return;

    try {
      await deleteComment(id, user.token);

      toast.success("Comment Deleted");

      loadComments();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-6">
        {comments.length} Comments
      </h2>

      {user ? (
        <div className="bg-white rounded-xl border p-5">

          <textarea
            rows={4}
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Add a public comment..."
            className="w-full border rounded-lg p-4 resize-none outline-none focus:ring-2 focus:ring-red-500"
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
        <div className="bg-white border rounded-xl p-5 text-gray-500">
          Login to comment.
        </div>
      )}

      <div className="space-y-5 mt-8">

        {comments.length === 0 && (
          <div className="bg-white border rounded-xl p-6 text-center">
            No comments yet.
          </div>
        )}

        {comments.map((item) => (
          <CommentCard
            key={item._id}
            comment={item}
            user={user}
            editingId={editingId}
            editText={editText}
            setEditingId={setEditingId}
            setEditText={setEditText}
            saveComment={saveComment}
            removeComment={removeComment}
          />
        ))}

      </div>

    </div>
  );
};

export default Comments;