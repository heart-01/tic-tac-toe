import mongoose from "mongoose";

const UserScoreSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    wins: {
      type: Number,
      default: 0,
    },
    losses: {
      type: Number,
      default: 0,
    },
    draws: {
      type: Number,
      default: 0,
    },
    bestWinStreak: {
      type: Number,
      default: 0,
    },
    currentWinStreak: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.UserScore ||
  mongoose.model("UserScore", UserScoreSchema);
