import {
  FaHome,
  FaFire,
  FaMusic,
  FaGamepad,
  FaHistory,
} from "react-icons/fa";

const Sidebar = ({ open }) => {
  return (
    <aside
      className={`fixed top-16 left-0 h-screen transition-all duration-300 ${
        open ? "w-60" : "w-20"
      }`}
    >
      <div className="flex flex-col gap-6 mt-6 px-4">

        <div className="flex items-center gap-4">
          <FaHome />
          {open && <span>Home</span>}
        </div>

        <div className="flex items-center gap-4">
          <FaFire />
          {open && <span>Trending</span>}
        </div>

        <div className="flex items-center gap-4">
          <FaMusic />
          {open && <span>Music</span>}
        </div>

        <div className="flex items-center gap-4">
          <FaGamepad />
          {open && <span>Gaming</span>}
        </div>

        <div className="flex items-center gap-4">
          <FaHistory />
          {open && <span>History</span>}
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;