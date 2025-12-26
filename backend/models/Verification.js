const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema(
  {
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      required: true,
      index: true,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Verification Details
    isAccurate: { type: Boolean, required: true },
    feedback: String,
    suggestedCorrections: {
      transcription: String,
      metadata: mongoose.Schema.Types.Mixed,
    },

    // Status
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

    // Timestamps
    verifiedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate verifications
verificationSchema.index({ story: 1, verifiedBy: 1 }, { unique: true });

module.exports = mongoose.model("Verification", verificationSchema);
