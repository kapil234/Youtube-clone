import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

// Get all comments for a video
router.get("/:videoId", getComments);

// Add comment
router.post("/", protect, addComment);

// Edit comment
router.put("/:id", protect, updateComment);

// Delete comment
router.delete("/:id", protect, deleteComment);

export default router;