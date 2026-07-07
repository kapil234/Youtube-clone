import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useVideo } from "../context/VideoContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UploadVideo = () => {
  const { user } = useAuth();
  const { loadVideos } = useVideo();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/videos",
        form,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Video Uploaded Successfully");

      // Reload videos so the home page shows the new upload
      await loadVideos();

      // Navigate back to Home
      navigate("/my-channel");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center pt-20 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 space-y-5"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Upload Video
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
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;