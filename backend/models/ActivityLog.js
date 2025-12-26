const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Action Details
    actionType: {
      type: String,
      enum: [
        "story_uploaded",
        "story_listened",
        "story_shared",
        "story_downloaded",
        "achievement_earned",
        "profile_updated",
        "story_verified",
      ],
      required: true,
      index: true,
    },

    // Related Entities
    relatedStory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
    relatedAchievement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Achievement",
    },

    // Points
    pointsEarned: { type: Number, default: 0 },

    // Metadata
    metadata: mongoose.Schema.Types.Mixed,

    // Timestamp
    timestamp: { type: Date, default: Date.now, index: true },
  },
  {
    timestamps: false,
  }
);

// Indexes
activityLogSchema.index({ user: 1, timestamp: -1 });
activityLogSchema.index({ actionType: 1, timestamp: -1 });

module.exports = mongoose.model("ActivityLog", activityLogSchema);
