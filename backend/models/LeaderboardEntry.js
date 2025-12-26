const mongoose = require("mongoose");

const leaderboardEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Metrics
    totalPoints: { type: Number, required: true },
    storiesUploaded: { type: Number, default: 0 },
    storiesRead: { type: Number, default: 0 },
    totalListens: { type: Number, default: 0 },

    // Ranking
    rank: { type: Number, required: true },
    previousRank: Number,
    rankChange: Number,

    // Period
    period: {
      type: String,
      enum: ["daily", "weekly", "monthly", "all-time"],
      required: true,
    },
    periodStart: Date,
    periodEnd: Date,

    // Snapshot date
    snapshotDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Compound indexes
leaderboardEntrySchema.index({ period: 1, rank: 1 });
leaderboardEntrySchema.index({ user: 1, period: 1, snapshotDate: -1 });
leaderboardEntrySchema.index({ period: 1, totalPoints: -1 });

module.exports = mongoose.model("LeaderboardEntry", leaderboardEntrySchema);
