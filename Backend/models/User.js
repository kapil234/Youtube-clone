import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default:
        "https://ui-avatars.com/api/?background=random",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);