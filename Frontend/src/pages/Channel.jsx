import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getChannel } from "../services/channelApi";

const Channel = () => {

  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {

    loadChannel();

  }, [id]);

  const loadChannel = async () => {

    const res = await getChannel(id);

    setData(res.data);

  };

  if (!data) {

    return <div className="pt-20">Loading...</div>;

  }

  const { channel, videos } = data;

  return (

    <div className="pt-20">

      <img
        src={channel.banner}
        className="w-full h-64 object-cover"
      />

      <div className="max-w-7xl mx-auto p-6">

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

          </div>

        </div>

        <h2 className="text-2xl font-bold mt-10 mb-6">
          Videos
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {videos.map((video) => (

            <div
              key={video._id}
              className="bg-zinc-900 rounded-lg overflow-hidden"
            >

              <img
                src={video.thumbnail}
                className="w-full h-44 object-cover"
              />

              <div className="p-3">

                <h3 className="font-semibold">
                  {video.title}
                </h3>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default Channel;