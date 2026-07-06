import FilterButtons from "../components/FilterButton";
import VideoCard from "../components/VideoCard";
import { videos } from "../data/data";

const Home = ({ sidebarOpen }) => {
  return (
    <main
      className={`pt-20 transition-all duration-300 ${
        sidebarOpen ? "ml-60" : "ml-20"
      }`}
    >
      <div className="px-6">
        <FilterButtons />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;