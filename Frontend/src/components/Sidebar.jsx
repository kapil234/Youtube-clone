import {
  FaHome,
  FaFire,
  FaMusic,
  FaGamepad,
  FaHistory,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    icon: <FaHome size={20} />,
    label: "Home",
    path: "/",
  },
  {
    icon: <FaFire size={20} />,
    label: "Trending",
    path: "/trending",
  },
  {
    icon: <FaMusic size={20} />,
    label: "Music",
    path: "/music",
  },
  {
    icon: <FaGamepad size={20} />,
    label: "Gaming",
    path: "/gaming",
  },
  {
    icon: <FaHistory size={20} />,
    label: "History",
    path: "/history",
  },
];

const Sidebar = ({ open }) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed top-16 left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40
      ${open ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
      ${open ? "md:w-60" : "md:w-20"}
      w-60`}
    >
      <div className="flex flex-col gap-2 mt-4 px-3">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex items-center ${
              open ? "justify-start px-4" : "justify-center"
            } h-12 rounded-xl text-gray-700 hover:bg-gray-100 transition`}
          >
            <span className="text-xl">{item.icon}</span>

            {open && (
              <span className="ml-6 text-sm font-medium">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;