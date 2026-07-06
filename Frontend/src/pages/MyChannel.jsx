import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getMyChannel } from "../services/channelApi";

const MyChannel = () => {

  const { user } = useAuth();

  const [channel, setChannel] = useState(null);

  useEffect(() => {

    loadChannel();

  }, []);

  const loadChannel = async () => {

    const res = await getMyChannel(user.token);

    setChannel(res.data);

  };

  if (!channel) {

    return (
      <div className="pt-24 text-center">

        <h1>No Channel Found</h1>

        <Link
          to="/create-channel"
          className="text-red-500"
        >
          Create One
        </Link>

      </div>
    );

  }

  return (

    <div className="pt-20">

      <img
        src={channel.banner}
        className="w-full h-64 object-cover"
      />

      <div className="max-w-6xl mx-auto p-8">

        <div className="flex gap-5 items-center">

          <img
            src={channel.logo}
            className="w-32 h-32 rounded-full"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {channel.channelName}
            </h1>

            <p>{channel.description}</p>

            <p className="text-gray-400 mt-2">
              {channel.subscribers} Subscribers
            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default MyChannel;