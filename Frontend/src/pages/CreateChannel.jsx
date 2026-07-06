import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { createChannel } from "../services/channelApi";

const CreateChannel = () => {

  const navigate = useNavigate();

  const { user } = useAuth();

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

      toast.success("Channel Created");

      navigate("/my-channel");

    } catch (err) {

      toast.error(err.response?.data?.message);

    }

  };

  return (
    <div className="min-h-screen pt-24 flex justify-center">

      <form
        onSubmit={submit}
        className="bg-zinc-900 p-8 rounded-xl w-[600px] space-y-4"
      >

        <h1 className="text-3xl font-bold">
          Create Channel
        </h1>

        <input
          name="channelName"
          placeholder="Channel Name"
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          name="logo"
          placeholder="Logo URL"
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          name="banner"
          placeholder="Banner URL"
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <button className="bg-red-600 w-full py-3 rounded">
          Create Channel
        </button>

      </form>

    </div>
  );
};

export default CreateChannel;