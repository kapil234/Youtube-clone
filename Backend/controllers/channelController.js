import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

// =======================
// Create Channel
// =======================
export const createChannel = async (req, res) => {
  try {
    const exists = await Channel.findOne({
      owner: req.user._id,
    });

    if (exists) {
      return res.status(400).json({
        message: "You already have a channel",
      });
    }

    const channel = await Channel.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Get My Channel
// =======================
export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({
      owner: req.user._id,
    }).populate("owner", "username email profile");

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    const videos = await Video.find({
      channel: channel._id,
    })
      .populate("owner", "username profile")
      .populate("channel", "channelName logo");

    res.status(200).json({
      channel,
      videos,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Get Channel By Id
// =======================
export const getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate("owner", "username email profile");

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    const videos = await Video.find({
      channel: channel._id,
    })
      .populate("owner", "username profile")
      .populate("channel", "channelName logo subscribers")
      .sort({ createdAt: -1 });

    res.status(200).json({
      channel,
      videos,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Update Channel
// =======================
export const updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({
      owner: req.user._id,
    });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    Object.assign(channel, req.body);

    await channel.save();

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Delete Channel
// =======================
export const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({
      owner: req.user._id,
    });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    await Video.deleteMany({
      channel: channel._id,
    });

    await channel.deleteOne();

    res.status(200).json({
      message: "Channel deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};