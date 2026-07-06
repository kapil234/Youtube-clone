import { createContext, useContext, useState } from "react";
import { videos } from "../data/data";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [allVideos] = useState(videos);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredVideos = allVideos.filter((video) => {
    const matchSearch = video.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || video.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <VideoContext.Provider
      value={{
        search,
        setSearch,
        category,
        setCategory,
        filteredVideos,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);