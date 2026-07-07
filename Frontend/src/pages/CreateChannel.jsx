import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { createChannel } from "../services/channelApi";

const CreateChannel = () => {
  const navigate = useNavigate();
  const { user, setHasChannel } = useAuth();

  const [form, setForm] = useState({
    channelName: "",
    description: "",
    logo: "",
    banner: "",
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
    await createChannel(form, user.token);

    setHasChannel(true);

    toast.success("Channel Created Successfully");

    navigate("/my-channel");
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
        "Failed to create channel"
    );
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-24">
      <form
        onSubmit={submit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <FaYoutube className="text-red-600 text-6xl" />

          <h1 className="text-3xl font-bold text-gray-900 mt-3">
            Create Your Channel
          </h1>

          <p className="text-gray-500 mt-2">
            Customize your YouTube channel information
          </p>
        </div>

        {/* Channel Name */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Channel Name
          </label>

          <input
            type="text"
            name="channelName"
            value={form.channelName}
            onChange={handleChange}
            placeholder="Enter channel name"
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>

        <textarea
  name="description"
  value={form.description}
  onChange={handleChange}
  rows="4"
  placeholder="Tell viewers about your channel..."
  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 resize-none"
  required
/>
        </div>

        

       {/* Logo URL */}
<div className="mb-5">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Channel Logo URL
  </label>

  <input
    type="text"
    name="logo"
    value={form.logo}
    onChange={handleChange}
    placeholder="https://example.com/logo.jpg"
    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
    required
  />

  {form.logo && (
    <img
      src={form.logo}
      alt="Logo Preview"
      className="w-24 h-24 rounded-full object-cover border mt-4"
    />
  )}
</div>

       {/* Banner URL */}
<div className="mb-8">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Channel Banner URL
  </label>

  <input
    type="text"
    name="banner"
    value={form.banner}
    onChange={handleChange}
    placeholder="https://example.com/banner.jpg"
    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
    required
  />

  {form.banner && (
    <img
      src={form.banner}
      alt="Banner Preview"
      className="w-full h-40 rounded-xl object-cover border mt-4"
    />
  )}
</div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Create Channel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChannel;