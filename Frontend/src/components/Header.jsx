import { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaSearch,
  FaYoutube,
  FaUserCircle,
  FaSignOutAlt,
  FaUpload,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useVideo } from "../context/VideoContext";
import { useAuth } from "../context/AuthContext";

const Header = ({ toggleSidebar }) => {
  const {
    user,
    logout,
    hasChannel,
  } = useAuth();

  const { search, setSearch } = useVideo();

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      closeMenu
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        closeMenu
      );
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center justify-between px-6 shadow-md z-50">

      {/* Left */}

      <div className="flex items-center gap-4">

        <button onClick={toggleSidebar}>
          <FaBars size={22} />
        </button>

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <FaYoutube
            size={32}
            className="text-red-600"
          />

          <h1 className="text-xl font-bold">
            YouTube Clone
          </h1>

        </div>

      </div>

      {/* Search */}

      <div className="hidden md:flex w-[500px] items-center">

        <input
          type="text"
          value={search}
          placeholder="Search"
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 h-10 px-4 border rounded-l-full outline-none"
        />

        <button className="h-10 px-6 border border-l-0 rounded-r-full bg-gray-100 hover:bg-gray-200">
          <FaSearch />
        </button>

      </div>

      {/* Right */}

      {user ? (

        <div
          className="relative"
          ref={menuRef}
        >

          <img
            src={`https://ui-avatars.com/api/?name=${user.username}&background=ff0000&color=fff`}
            alt=""
            onClick={() =>
              setShowMenu(!showMenu)
            }
            className="w-10 h-10 rounded-full cursor-pointer"
          />

          {showMenu && (

            <div className="absolute right-0 top-14 w-72 bg-white rounded-2xl shadow-xl border overflow-hidden">

              <div className="flex items-center gap-4 p-4">

                <img
                  src={
                    user.profile ||
                    `https://ui-avatars.com/api/?name=${user.username}`
                  }
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>

                  <h3 className="font-semibold">
                    {user.username}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>

                </div>

              </div>

              <hr />

              {hasChannel ? (

                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/my-channel");
                  }}
                  className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-100"
                >
                  <FaUserCircle />

                  <span>Your Channel</span>

                </button>

              ) : (

                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/create-channel");
                  }}
                  className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-100"
                >
                  <FaUpload />

                  <span>Create Channel</span>

                </button>

              )}

              <hr />

              <button
                onClick={() => {
                  logout();

                  navigate("/login");
                }}
                className="w-full flex items-center gap-4 px-5 py-3 text-red-600 hover:bg-red-50"
              >
                <FaSignOutAlt />

                <span>Sign Out</span>

              </button>

            </div>

          )}

        </div>

      ) : (

        <button
          onClick={() =>
            navigate("/login")
          }
          className="border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-50"
        >
          Sign In
        </button>

      )}

    </header>
  );
};

export default Header;