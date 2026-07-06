import axios from "axios";

const API = "http://localhost:5000/api/comments";

export const getComments = (videoId) =>
  axios.get(`${API}/${videoId}`);

export const addComment = (data, token) =>
  axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateComment = (id, data, token) =>
  axios.put(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteComment = (id, token) =>
  axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });