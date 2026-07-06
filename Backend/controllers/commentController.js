import Comment from "../models/Comment.js";
export const addComment = async (req, res) => {
  try {
    const { text, video } = req.body;

    if (!text || !video) {
      return res.status(400).json({
        message: "Text and Video are required",
      });
    }

    const comment = await Comment.create({
      text,
      video,
      owner: req.user._id,
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate("owner", "username avatar");

    res.status(201).json(populatedComment);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
//Get Comments by Video
export const getComments = async (req, res) => {
  try {

    const comments = await Comment.find({
      video: req.params.videoId,
    })
      .populate("owner", "username avatar")
      .sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
//Update Comment
export const updateComment = async (req, res) => {

  try {

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (
      comment.owner.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    comment.text = req.body.text;

    await comment.save();

    const updated = await Comment.findById(comment._id)
      .populate("owner", "username avatar");

    res.json(updated);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
//Delete Comment
export const deleteComment = async (req, res) => {

  try {

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (
      comment.owner.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    await comment.deleteOne();

    res.json({
      message: "Comment Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};