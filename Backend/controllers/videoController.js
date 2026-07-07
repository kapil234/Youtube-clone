import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

// =======================
// Create Video
// =======================
export const createVideo = async (req, res) => {
  try {
    // Find logged-in user's channel
    const channel = await Channel.findOne({
      owner: req.user._id,
      //channel: channel._id,
    
    });

    if (!channel) {
      return res.status(404).json({
        message: "Please create a channel first.",
      });
    }

    const video = await Video.create({
      ...req.body,
      owner: req.user._id,
      channel: channel._id,
    });

    const populatedVideo = await Video.findById(video._id)
      .populate("owner", "username profile")
      .populate("channel", "channelName logo subscribers");

    res.status(201).json(populatedVideo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Get All Videos
// =======================
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("owner", "username profile")
      .populate("channel", "channelName logo subscribers")
      .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Get Single Video
// =======================
export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("owner", "username profile")
      .populate("channel", "channelName logo subscribers");

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Update Video
// =======================
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    if (video.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    Object.assign(video, req.body);

    await video.save();

    const updatedVideo = await Video.findById(video._id)
      .populate("owner", "username profile")
      .populate("channel", "channelName logo subscribers");

    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Delete Video
// =======================
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    if (video.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await video.deleteOne();

    res.status(200).json({
      message: "Video deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
