import FilterButtons from "../components/FilterButton";
import VideoCard from "../components/VideoCard";
import { useVideo } from "../context/VideoContext";

const Home = ({ sidebarOpen }) => {
  const { filteredVideos } = useVideo();

  return (
    <main
      className={`pt-20 transition-all duration-300 ${
        sidebarOpen ? "ml-60" : "ml-20"
      }`}
    >
      <div className="px-6">
        <FilterButtons />

        {filteredVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <h1 className="text-3xl font-bold text-gray-800">
              No Videos Found
            </h1>

            <p className="text-gray-500 mt-3">
              Try another search.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;