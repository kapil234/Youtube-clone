import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md w-full">

        <FaYoutube className="text-red-600 text-7xl mx-auto" />

        <h1 className="text-6xl font-bold text-gray-800 mt-6">
          404
        </h1>

        <h2 className="text-2xl font-semibold mt-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition"
        >
          Go Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;