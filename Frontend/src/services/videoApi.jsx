import axios from "axios";

const API = "http://localhost:5000/api/videos";

export const getVideos = () => axios.get(API);

export const getVideo = (id) =>
  axios.get(`${API}/${id}`);