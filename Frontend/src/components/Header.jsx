import { FaBars, FaSearch, FaYoutube } from "react-icons/fa";
import { useVideo } from "../context/VideoContext";

const Header = ({ toggleSidebar }) => {
    const { search, setSearch } = useVideo();
  return (
    <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 shadow-md z-50">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar}>
          <FaBars size={22} />
        </button>

        <div className="flex items-center gap-2 text-red-600">
          <FaYoutube size={30} />
          <h1 className="text-xl font-bold text-white">YouTube Clone</h1>
        </div>
      </div>

      <div className="hidden md:flex w-[450px] items-center">
  <input
    type="text"
    placeholder="Search"
      onChange={(e) => setSearch(e.target.value)}
    className="flex-1 h-10 px-4 border border-gray-300 rounded-l-full bg-white text-black placeholder-gray-500 outline-none focus:border-blue-500"
  />

  <button className="h-10 px-6 border border-l-0 border-gray-300 rounded-r-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
    <FaSearch className="text-gray-700" />
  </button>
</div>
      <button className="bg-red-600 px-4 py-2 rounded-lg">
        Sign In
      </button>
    </header>
  );
};

export default Header;