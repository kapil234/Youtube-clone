import axios from "axios";

const API = "http://localhost:5000/api/videos";

export const getVideos = () =>
  axios.get(API);

export const getVideo = (id) =>
  axios.get(`${API}/${id}`);

export const createVideo = (data, token) =>
  axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateVideo = (id, data, token) =>
  axios.put(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteVideo = (id, token) =>
  axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });