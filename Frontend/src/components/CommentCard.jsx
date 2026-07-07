import { useEffect, useRef, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const CommentCard = ({
  comment,
  user,
  editingId,
  editText,
  setEditingId,
  setEditText,
  saveComment,
  removeComment,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div className="bg-white rounded-xl border shadow-sm p-5">

      <div className="flex gap-4">

        {/* Avatar */}

        <img
          src={
            comment.owner?.avatar ||
            "https://i.pravatar.cc/150"
          }
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex-1">

          {/* Header */}

          <div className="flex justify-between items-start">

            <div>

              <h3 className="font-semibold text-gray-900">
                {comment.owner?.username}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {new Date(
                  comment.createdAt
                ).toLocaleString()}
              </p>

            </div>

            {/* Three Dot Menu */}

            {user &&
              comment.owner &&
              user._id === comment.owner._id && (

                <div
                  className="relative"
                  ref={menuRef}
                >

                  <button
                    onClick={() =>
                      setShowMenu(!showMenu)
                    }
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <FaEllipsisV />
                  </button>

                  {showMenu && (

                    <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg overflow-hidden z-50">

                      <button
                        onClick={() => {
                          setEditingId(
                            comment._id
                          );

                          setEditText(
                            comment.text
                          );

                          setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          removeComment(
                            comment._id
                          );

                          setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>

                    </div>

                  )}

                </div>

              )}

          </div>

          {/* Comment */}

          {editingId === comment._id ? (

            <div className="mt-4">

              <textarea
                rows={3}
                value={editText}
                onChange={(e) =>
                  setEditText(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg p-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex justify-end gap-3 mt-4">

                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditText("");
                  }}
                  className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={() =>
                    saveComment(
                      comment._id
                    )
                  }
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save
                </button>

              </div>

            </div>

          ) : (

            <p className="text-gray-700 mt-3 leading-7">
              {comment.text}
            </p>

          )}

        </div>

      </div>

    </div>
  );
};

export default CommentCard;