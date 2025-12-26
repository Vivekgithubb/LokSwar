const mongoose = require("mongoose");

const dialectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nativeName: String,
    isoCode: String,

    // Classification
    languageFamily: String,
    region: {
      states: [String],
      primaryRegion: String,
    },

    // Status
    endangermentLevel: {
      type: String,
      enum: [
        "safe",
        "vulnerable",
        "endangered",
        "critically_endangered",
        "extinct",
      ],
      default: "safe",
    },
    speakerCount: Number,

    // Statistics
    stats: {
      storiesCount: { type: Number, default: 0 },
      contributorsCount: { type: Number, default: 0 },
    },

    // Metadata
    description: String,
    relatedDialects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dialect",
      },
    ],
  },
  {
    timestamps: true,
  }
);

dialectSchema.index({ name: 1 });
dialectSchema.index({ "region.states": 1 });

module.exports = mongoose.model("Dialect", dialectSchema);
