import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
      trim: true,
    },

    description: String,

    logo: {
      type: String,
      default:
        "https://i.pravatar.cc/150",
    },

    banner: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },

    subscribers: {
      type: Number,
      default: 0,
    },

    totalVideos: {
      type: Number,
      default: 0,
    },

    totalViews: {
      type: Number,
      default: 0,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    

    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Channel", channelSchema);