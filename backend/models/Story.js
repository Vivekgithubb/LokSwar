const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: true,
      trim: true,
      index: "text",
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    // Creator
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    narrator: {
      name: { type: String, required: true },
      age: Number,
      additionalInfo: String,
    },

    // Classification
    category: {
      type: String,
      required: true,
      enum: ["Folk Tales", "Songs", "Rituals", "Knowledge", "Crafts", "Other"],
      index: true,
    },
    dialect: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dialect",
      required: true,
      index: true,
    },

    // Location
    location: {
      village: String,
      city: String,
      district: String,
      state: { type: String, required: true },
      country: { type: String, default: "India" },
      coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: [Number],
      },
    },

    // Audio Files
    audioFile: {
      originalUrl: { type: String, required: true },
      processedUrl: String,
      duration: { type: Number, required: true },
      fileSize: Number,
      format: { type: String, default: "mp3" },
      quality: {
        sampleRate: { type: Number, default: 48000 },
        bitrate: { type: Number, default: 320 },
      },
    },

    // Transcription
    transcription: {
      fullText: { type: String, required: true, index: "text" },
      summary: { type: String, required: true },
      keywords: [String],
      culturalSignificance: String,
      confidence: { type: Number, min: 0, max: 1 },
      language: { type: String, default: "hi" },
      processedAt: Date,
    },

    // Engagement Metrics
    metrics: {
      views: { type: Number, default: 0 },
      listens: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      downloads: { type: Number, default: 0 },
      verifications: { type: Number, default: 0 },
    },

    // Status
    status: {
      type: String,
      enum: ["processing", "published", "archived", "flagged"],
      default: "processing",
      index: true,
    },
    isVerified: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },

    // Timestamps
    recordedDate: { type: Date, required: true },
    uploadedDate: { type: Date, default: Date.now },
    publishedDate: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes
storySchema.index({ "location.coordinates": "2dsphere" });
storySchema.index({ title: "text", "transcription.fullText": "text" });
storySchema.index({ category: 1, status: 1 });
storySchema.index({ uploadedBy: 1, uploadedDate: -1 });
storySchema.index({ "metrics.listens": -1 });

// Methods
storySchema.methods.incrementMetric = async function (metricName) {
  this.metrics[metricName] = (this.metrics[metricName] || 0) + 1;
  return this.save();
};

module.exports = mongoose.model("Story", storySchema);
