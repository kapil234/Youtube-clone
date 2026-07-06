import axios from "axios";

const API = "http://localhost:5000/api/channels";

export const createChannel = (data, token) =>
  axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getMyChannel = (token) =>
  axios.get(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getChannel = (id) =>
  axios.get(`${API}/${id}`);

export const updateChannel = (data, token) =>
  axios.put(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteChannel = (token) =>
  axios.delete(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });