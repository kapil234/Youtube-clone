import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createChannel,
  getMyChannel,
  getChannel,
  updateChannel,
  deleteChannel,
} from "../controllers/channelController.js";

const router = express.Router();

router.post("/", protect, createChannel);

router.get("/me", protect, getMyChannel);

router.get("/:id", getChannel);

router.put("/", protect, updateChannel);

router.delete("/", protect, deleteChannel);

export default router;