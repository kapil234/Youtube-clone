import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { useVideo } from "../context/VideoContext";

const EditVideo = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { loadVideos } = useVideo();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
    category: "",
  });

  useEffect(() => {
    loadVideo();
  }, []);

  const loadVideo = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/videos/${id}`
      );

      setForm({
        title: res.data.title || "",
        description: res.data.description || "",
        thumbnail: res.data.thumbnail || "",
        videoUrl: res.data.videoUrl || "",
        category: res.data.category || "",
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to load video");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/videos/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Video Updated Successfully");

      await loadVideos();

      navigate("/my-channel");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Update Failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center pt-20 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 space-y-5"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Edit Video
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Video Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
        />

        <textarea
          name="description"
          placeholder="Video Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
        />

        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={form.thumbnail}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
        />

        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL"
          value={form.videoUrl}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
        >
          <option value="">Select Category</option>
          <option value="React">React</option>
          <option value="Node">Node</option>
          <option value="MongoDB">MongoDB</option>
          <option value="Express">Express</option>
          <option value="JavaScript">JavaScript</option>
          <option value="CSS">CSS</option>
        </select>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
        >
          Update Video
        </button>
      </form>
    </div>
  );
};

export default EditVideo;