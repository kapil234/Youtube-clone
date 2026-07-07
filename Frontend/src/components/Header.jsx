import { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaSearch,
  FaYoutube,
  FaUserCircle,
  FaSignOutAlt,
  FaUpload,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useVideo } from "../context/VideoContext";
import { useAuth } from "../context/AuthContext";

const Header = ({ toggleSidebar }) => {
  const { user, logout, hasChannel } = useAuth();
  const { search, setSearch } = useVideo();

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] =
    useState(false);

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

    document.addEventListener("mousedown", closeMenu);

    return () =>
      document.removeEventListener(
        "mousedown",
        closeMenu
      );
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50">
      <div className="h-full px-3 sm:px-5 flex items-center justify-between gap-4">

        {/* ================= Mobile Search ================= */}
        {showMobileSearch ? (
          <div className="flex items-center w-full sm:hidden gap-2">
            <button
              onClick={() =>
                setShowMobileSearch(false)
              }
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FaArrowLeft size={18} />
            </button>

            <div className="flex flex-1 items-center">
              <input
                type="text"
                value={search}
                autoFocus
                placeholder="Search"
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="flex-1 h-10 border rounded-l-full px-4 outline-none"
              />

              <button className="h-10 w-12 border border-l-0 rounded-r-full bg-gray-100 flex items-center justify-center">
                <FaSearch />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ================= Left ================= */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <FaBars size={20} />
              </button>

              <div
                onClick={() => navigate("/")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <FaYoutube
                  size={32}
                  className="text-red-600"
                />

                <h1 className="hidden md:block text-2xl font-bold whitespace-nowrap">
                  YouTube Clone
                </h1>
              </div>
            </div>

            {/* ================= Desktop Search ================= */}
            <div className="hidden sm:flex flex-1 max-w-2xl items-center">
              <input
                type="text"
                value={search}
                placeholder="Search"
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="flex-1 h-10 border rounded-l-full px-4 outline-none focus:border-blue-500"
              />

              <button className="h-10 w-14 border border-l-0 rounded-r-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <FaSearch />
              </button>
            </div>

            {/* ================= Right ================= */}
            <div className="flex items-center gap-3 flex-shrink-0">

              {/* Mobile Search Icon */}
              <button
                onClick={() =>
                  setShowMobileSearch(true)
                }
                className="sm:hidden p-2 rounded-full hover:bg-gray-100"
              >
                <FaSearch size={18} />
              </button>

              {user ? (
                <div
                  className="relative"
                  ref={menuRef}
                >
                  <img
                    src={
                      user.profile ||
                      `https://ui-avatars.com/api/?name=${user.username}&background=ff0000&color=fff`
                    }
                    alt=""
                    onClick={() =>
                      setShowMenu(!showMenu)
                    }
                    className="w-10 h-10 rounded-full border object-cover cursor-pointer"
                  />

                  {showMenu && (
                    <div className="absolute right-0 top-14 w-72 bg-white rounded-xl shadow-xl border overflow-hidden">

                      <div className="flex items-center gap-3 p-4">
                        <img
                          src={
                            user.profile ||
                            `https://ui-avatars.com/api/?name=${user.username}`
                          }
                          alt=""
                          className="w-12 h-12 rounded-full"
                        />

                        <div>
                          <h3 className="font-semibold">
                            {user.username}
                          </h3>

                          <p className="text-sm text-gray-500 break-all">
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
                          <span>
                            Your Channel
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setShowMenu(false);
                            navigate(
                              "/create-channel"
                            );
                          }}
                          className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-100"
                        >
                          <FaUpload />
                          <span>
                            Create Channel
                          </span>
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
                  className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50"
                >
                  Sign In
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;