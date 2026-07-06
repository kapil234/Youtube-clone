import { createContext, useContext, useEffect, useState } from "react";
import { getVideos } from "../services/videoApi";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {

  const [videos, setVideos] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const res = await getVideos();
      setVideos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredVideos = videos.filter((video) => {
    const searchMatch = video.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ||
      video.category === category;

    return searchMatch && categoryMatch;
  });

  return (
    <VideoContext.Provider
      value={{
        filteredVideos,
        search,
        setSearch,
        category,
        setCategory,
        loadVideos,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () =>
  useContext(VideoContext);