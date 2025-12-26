import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    // Authentication
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

    // Profile Information
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      maxlength: 500,
      default: "",
    },

    // Location
    location: {
      city: String,
      state: String,
      country: { type: String, default: "India" },
      coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: [Number],
      },
    },

    // Statistics
    stats: {
      storiesUploaded: { type: Number, default: 0 },
      storiesRead: { type: Number, default: 0 },
      totalListens: { type: Number, default: 0 },
      dialectsContributed: { type: Number, default: 0 },
      totalPoints: { type: Number, default: 0 },
      leaderboardRank: { type: Number, default: null },
    },

    // Achievements
    achievements: [
      {
        achievementId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Achievement",
        },
        earnedAt: { type: Date, default: Date.now },
      },
    ],

    // Account Status
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["user", "moderator", "admin"],
      default: "user",
    },

    // Timestamps
    joinDate: { type: Date, default: Date.now },
    lastActive: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Indexes
userSchema.index({ "location.coordinates": "2dsphere" });
userSchema.index({ "stats.totalPoints": -1 });
userSchema.index({ "stats.leaderboardRank": 1 });

// Methods
userSchema.methods.updateStats = async function (updates) {
  Object.assign(this.stats, updates);
  return this.save();
};

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  realPassword
) {
  return await bcrypt.compare(candidatePassword, realPassword);
};

const User = mongoose.model("User", userSchema);
export default User;
