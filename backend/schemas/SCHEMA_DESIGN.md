# LokSwar MongoDB Backend Schema Design

## Overview

This document provides comprehensive MongoDB schema models for the LokSwar oral tradition archive application. Each schema is designed based on analysis of all frontend pages and features.

---

## 1. User Schema

### Purpose

Stores user authentication, profile information, statistics, and achievements.

### Schema Design

```javascript
const mongoose = require("mongoose");

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
      select: false, // Don't return password in queries by default
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
      type: String, // URL to image (S3, Cloudinary, etc.)
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
        coordinates: [Number], // [longitude, latitude]
      },
    },

    // Statistics (denormalized for performance)
    stats: {
      storiesUploaded: { type: Number, default: 0 },
      storiesRead: { type: Number, default: 0 },
      totalListens: { type: Number, default: 0 }, // Listens on user's stories
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
userSchema.index({ "location.coordinates": "2dsphere" }); // Geospatial queries
userSchema.index({ "stats.totalPoints": -1 }); // Leaderboard sorting
userSchema.index({ "stats.leaderboardRank": 1 });

module.exports = mongoose.model("User", userSchema);
```

### Design Decisions

1. **Email & Username**: Both indexed for fast lookups during authentication
2. **Password**: `select: false` prevents accidental password exposure
3. **Location Coordinates**: GeoJSON format for geospatial queries (map features)
4. **Denormalized Stats**: Stored directly for fast leaderboard queries instead of calculating on-the-fly
5. **Achievements Array**: References Achievement model for flexibility
6. **Indexes**: Optimized for leaderboard sorting and location-based queries

---

## 2. Story Schema

### Purpose

Stores recorded oral tradition stories with metadata, transcription, and audio files.

### Schema Design

```javascript
const storySchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: true,
      trim: true,
      index: "text", // Text search
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
        coordinates: [Number], // [longitude, latitude]
      },
    },

    // Audio Files
    audioFile: {
      originalUrl: { type: String, required: true }, // Raw recording
      processedUrl: String, // AI-enhanced audio
      duration: { type: Number, required: true }, // in seconds
      fileSize: Number, // in bytes
      format: { type: String, default: "mp3" },
      quality: {
        sampleRate: { type: Number, default: 48000 }, // 48kHz
        bitrate: { type: Number, default: 320 }, // 320kbps
      },
    },

    // Transcription (from AI model)
    transcription: {
      fullText: { type: String, required: true, index: "text" },
      summary: { type: String, required: true },
      keywords: [String],
      culturalSignificance: String,
      confidence: { type: Number, min: 0, max: 1 }, // AI confidence score
      language: { type: String, default: "hi" }, // ISO code
      processedAt: Date,
    },

    // Engagement Metrics
    metrics: {
      views: { type: Number, default: 0 },
      listens: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      downloads: { type: Number, default: 0 },
      verifications: { type: Number, default: 0 }, // Community verifications
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
storySchema.index({ "metrics.listens": -1 }); // Popular stories

module.exports = mongoose.model("Story", storySchema);
```

### Design Decisions

1. **Narrator Object**: Embedded for quick access, separate from user who uploaded
2. **Dual Audio URLs**: Original + processed for quality comparison
3. **Transcription Embedded**: All AI-generated data in one subdocument for atomic updates
4. **GeoJSON Location**: Enables map-based queries and filtering
5. **Text Indexes**: Full-text search on title and transcription
6. **Denormalized Metrics**: Fast queries for popular/trending stories
7. **Status Enum**: Workflow management (processing → published)

---

## 3. Dialect Schema

### Purpose

Manages dialect/language information for categorization and preservation tracking.

### Schema Design

```javascript
const dialectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nativeName: String, // Name in the dialect itself
    isoCode: String, // ISO 639-3 code if available

    // Classification
    languageFamily: String, // e.g., "Indo-Aryan"
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
    speakerCount: Number, // Estimated number of speakers

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
```

### Design Decisions

1. **Endangerment Level**: Tracks preservation priority
2. **Region Array**: Dialects can span multiple states
3. **Denormalized Stats**: Quick access to contribution metrics
4. **Related Dialects**: Graph-like relationships for linguistic connections

---

## 4. Achievement Schema

### Purpose

Defines achievement badges and criteria for gamification.

### Schema Design

```javascript
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
    icon: String, // Icon identifier or URL

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
      threshold: Number, // e.g., 20 for "Upload 20 stories"
      customLogic: String, // For complex criteria
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
```

### Design Decisions

1. **Flexible Criteria**: Supports both simple thresholds and custom logic
2. **Points System**: Integrates with leaderboard
3. **Tier System**: Visual hierarchy for achievements
4. **Display Order**: Control achievement presentation order

---

## 5. Leaderboard Entry Schema

### Purpose

Snapshot-based leaderboard for historical tracking and performance.

### Schema Design

```javascript
const leaderboardEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Metrics
  totalPoints: { type: Number, required: true },
  storiesUploaded: { type: Number, default: 0 },
  storiesRead: { type: Number, default: 0 },
  totalListens: { type: Number, default: 0 },

  // Ranking
  rank: { type: Number, required: true },
  previousRank: Number,
  rankChange: Number,  // Positive = moved up

  // Period
  period: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'all-time'],
    required: true
  },
  periodStart: Date,
  periodEnd: Date,

  // Snapshot date
  snapshotDate: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Compound indexes for efficient queries
leaderboardEntrySchema.index({ period: 1, rank: 1 });
leaderboardEntrySchema.index({ user: 1, period: 1, snapshotDate: -1 });
leaderboardEntrySchema.index({ period: 1, totalPoints: -1 });

module.exports = mongoose.model('LeaderboardEntry', leaderboardEntry Schema);
```

### Design Decisions

1. **Snapshot Model**: Historical tracking of rankings over time
2. **Multiple Periods**: Daily, weekly, monthly, all-time leaderboards
3. **Rank Change**: Track user progress (gamification)
4. **Denormalized Data**: Fast queries without joins
5. **Compound Indexes**: Optimized for period-based ranking queries

---

## 6. Activity Log Schema

### Purpose

Tracks user actions for analytics, recent activity, and points calculation.

### Schema Design

```javascript
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
    metadata: mongoose.Schema.Types.Mixed, // Flexible additional data

    // Timestamp
    timestamp: { type: Date, default: Date.now, index: true },
  },
  {
    timestamps: false, // Using custom timestamp field
  }
);

// Indexes
activityLogSchema.index({ user: 1, timestamp: -1 });
activityLogSchema.index({ actionType: 1, timestamp: -1 });

module.exports = mongoose.model("ActivityLog", activityLogSchema);
```

### Design Decisions

1. **Event Sourcing**: Complete audit trail of user actions
2. **Points Integration**: Track points earned per action
3. **Flexible Metadata**: Store action-specific data
4. **Time-based Indexes**: Efficient recent activity queries
5. **References**: Link to related entities for context

---

## 7. Verification Schema

### Purpose

Community verification of story transcriptions and metadata.

### Schema Design

```javascript
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
```

### Design Decisions

1. **Unique Constraint**: One verification per user per story
2. **Feedback System**: Constructive community input
3. **Suggested Corrections**: Crowdsourced improvements
4. **Status Workflow**: Moderation of verification submissions

---

## Relationships Diagram

```
User (1) ──── (N) Story
  │              │
  │              └── (N) Verification
  │
  ├── (N) Achievement (M:N through User.achievements)
  ├── (N) LeaderboardEntry
  └── (N) ActivityLog

Story (N) ──── (1) Dialect

Verification (N) ──── (1) Story
Verification (N) ──── (1) User
```

---

## Indexes Summary

### Critical Indexes for Performance

1. **User Collection**:

   - `email` (unique)
   - `username` (unique)
   - `stats.totalPoints` (desc) - Leaderboard
   - `location.coordinates` (2dsphere) - Map queries

2. **Story Collection**:

   - `uploadedBy` + `uploadedDate` (compound) - User's stories
   - `category` + `status` (compound) - Filtering
   - `location.coordinates` (2dsphere) - Map explorer
   - Text index on `title` and `transcription.fullText` - Search
   - `metrics.listens` (desc) - Popular stories

3. **LeaderboardEntry Collection**:

   - `period` + `rank` (compound) - Leaderboard display
   - `user` + `period` + `snapshotDate` (compound) - User history

4. **ActivityLog Collection**:
   - `user` + `timestamp` (compound) - Recent activity
   - `actionType` + `timestamp` (compound) - Analytics

---

## Data Size Estimations

### Assumptions

- 10,000 users
- 50,000 stories
- Average audio file: 5MB (stored separately in S3/CDN)

### Storage Requirements

| Collection       | Avg Doc Size | Count   | Total Size |
| ---------------- | ------------ | ------- | ---------- |
| User             | 2 KB         | 10,000  | ~20 MB     |
| Story            | 5 KB         | 50,000  | ~250 MB    |
| Dialect          | 1 KB         | 200     | ~200 KB    |
| Achievement      | 500 B        | 50      | ~25 KB     |
| LeaderboardEntry | 500 B        | 40,000  | ~20 MB     |
| ActivityLog      | 300 B        | 500,000 | ~150 MB    |
| Verification     | 1 KB         | 25,000  | ~25 MB     |

**Total MongoDB Storage**: ~465 MB (excluding audio files)

---

## API Integration Points

### For Frontend Pages

1. **Landing Page**: `User.stats`, `Story.metrics` (aggregated)
2. **Recording Page**: `Story.create()`, `Dialect.find()`
3. **Translate Page**: `Story.findById()`, `Story.transcription`
4. **Profile Page**: `User.findById()`, `ActivityLog.find()`, `User.achievements`
5. **Stories Page**: `Story.find()` with filters, pagination
6. **Story Detail**: `Story.findById()`, `Verification.find()`
7. **Leaderboard**: `LeaderboardEntry.find()` with period filter
8. **Map Explorer**: `Story.find()` with geospatial queries

---

## Next Steps for Implementation

1. **Set up MongoDB Atlas** or local MongoDB instance
2. **Create Mongoose models** from these schemas
3. **Implement API routes** (Express.js/Node.js)
4. **Add authentication** (JWT, Passport.js)
5. **File upload service** (AWS S3, Cloudinary)
6. **AI integration** for transcription
7. **Cron jobs** for leaderboard updates
8. **Search service** (MongoDB Atlas Search or Elasticsearch)
