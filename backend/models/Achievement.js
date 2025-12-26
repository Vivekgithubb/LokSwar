const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: String,

    // Criteria
    criteria: {
      type: {
        type: String,
        enum: [
          "stories_uploaded",
          "stories_read",
          "dialects_contributed",
          "total_listens",
          "custom",
        ],
        required: true,
      },
      threshold: Number,
      customLogic: String,
    },

    // Rewards
    pointsAwarded: { type: Number, default: 0 },

    // Metadata
    tier: {
      type: String,
      enum: ["bronze", "silver", "gold", "platinum"],
      default: "bronze",
    },
    isActive: { type: Boolean, default: true },
    displayOrder: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Achievement", achievementSchema);
