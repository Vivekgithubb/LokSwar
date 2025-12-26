import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import {
  User,
  MapPin,
  Calendar,
  Award,
  Mic,
  BookOpen,
  TrendingUp,
  Activity,
  Radio,
  Trophy,
  Star,
  Target,
  Zap,
  Globe,
  Languages,
  Clock,
  Camera,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
  );

  // Handle profile picture upload
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        // Here you would typically upload to your server
        // uploadProfilePicture(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Mock user data - replace with actual user data from authentication/database
  const userData = {
    name: "Priya Sharma",
    username: "@priya_storyteller",
    location: "Bangalore, Karnataka",
    joinDate: "January 2025",
    bio: "Passionate about preserving folk tales and oral traditions from Karnataka. Dedicated to keeping our cultural heritage alive for future generations.",

    // Statistics
    stats: {
      leaderboardRank: 12,
      totalPoints: 2847,
      storiesUploaded: 23,
      storiesRead: 156,
      totalListens: 4521,
      dialectsContributed: 5,
    },

    // Recent Activity
    recentStories: [
      {
        title: "The Legend of Jheel Tal",
        dialect: "Kumaoni",
        uploadDate: "Nov 20, 2025",
        listens: 234,
      },
      {
        title: "Kannada Harvest Songs",
        dialect: "Kannada",
        uploadDate: "Nov 15, 2025",
        listens: 189,
      },
      {
        title: "Tales of Hampi Ruins",
        dialect: "Kannada",
        uploadDate: "Nov 10, 2025",
        listens: 312,
      },
    ],

    // Achievements
    achievements: [
      {
        icon: Trophy,
        title: "Top Contributor",
        description: "Uploaded 20+ stories",
        earned: true,
      },
      {
        icon: Star,
        title: "Dialect Expert",
        description: "Contributed to 5+ dialects",
        earned: true,
      },
      {
        icon: Target,
        title: "Community Favorite",
        description: "1000+ total listens",
        earned: true,
      },
      {
        icon: Zap,
        title: "Early Adopter",
        description: "Joined in first month",
        earned: true,
      },
    ],
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-stone-50 selection:bg-orange-100 text-neutral-900 font-sans">
      {/* 1. HERO SECTION WITH PROFILE */}
      <section className="w-full border-b border-stone-200 bg-white">
        <div className="max-w-auto mx-auto grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT COLUMN: Profile Info */}
          <div className="lg:col-span-8 p-8 md:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200 relative overflow-hidden">
            {/* Background Texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            ></div>

            {/* Top Marker */}
            <div className="flex items-center gap-3 mb-8">
              <span className="px-2 py-1 bg-stone-100 border border-stone-200 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                User Profile
              </span>
              <span className="h-px w-12 bg-stone-300"></span>
            </div>

            {/* Profile Header */}
            <div className="relative z-10 mb-8">
              <div className="flex items-start gap-6 mb-6">
                {/* Profile Picture */}
                <div className="flex-shrink-0 relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-orange-600 overflow-hidden bg-stone-100">
                    <img
                      src={profilePicture}
                      alt={userData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Upload Button Overlay */}
                  <button
                    onClick={handleUploadClick}
                    className="absolute inset-0 w-32 h-32 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    aria-label="Upload profile picture"
                  >
                    <Camera className="w-8 h-8 text-white" />
                  </button>
                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                    aria-label="Profile picture file input"
                  />
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9] mb-3 text-neutral-900">
                    {userData.name}
                  </h1>
                  <p className="text-lg text-stone-500 font-mono mb-4">
                    {userData.username}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      <span>{userData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span>Joined {userData.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="max-w-2xl text-base text-stone-600 leading-relaxed font-serif border-l-2 border-orange-600 pl-6">
                {userData.bio}
              </p>
            </div>

            {/* Recent Activity */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                  Recent Contributions
                </span>
                <span className="h-px flex-1 bg-stone-200"></span>
              </div>

              <div className="space-y-3">
                {userData.recentStories.map((story, idx) => (
                  <div
                    key={idx}
                    className="bg-stone-50 border border-stone-200 p-4 hover:bg-white transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-neutral-900">
                        {story.title}
                      </h3>
                      <span className="text-xs text-stone-500">
                        {story.uploadDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-stone-600">
                      <div className="flex items-center gap-1">
                        <Languages className="w-3 h-3 text-orange-600" />
                        <span>{story.dialect}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3 text-orange-600" />
                        <span>{story.listens} listens</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Decor */}
            <div className="mt-8 flex items-center gap-2 text-stone-300">
              <Activity className="w-12 h-12 opacity-20" />
              <div className="h-px flex-1 bg-stone-100"></div>
            </div>
          </div>

          {/* RIGHT COLUMN: Statistics */}
          <div className="lg:col-span-4 bg-stone-50/50 flex flex-col">
            {/* Status Header */}
            <div className="p-6 border-b border-stone-200 bg-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                  Active Contributor
                </span>
              </div>
              <Radio className="w-4 h-4 text-stone-400" />
            </div>

            {/* Leaderboard Rank */}
            <div className="p-8 bg-white border-b border-stone-200 hover:bg-stone-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Leaderboard Rank
                </span>
                <Trophy className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-5xl font-mono font-bold text-neutral-900 mb-2">
                #{userData.stats.leaderboardRank}
              </div>
              <div className="text-sm text-stone-600">
                {userData.stats.totalPoints.toLocaleString()} points
              </div>
              <div className="w-full bg-stone-100 h-1 mt-4 overflow-hidden">
                <div
                  className="bg-orange-600 h-full"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="flex-1 flex flex-col divide-y divide-stone-200">
              {/* Stories Uploaded */}
              <div className="p-8 bg-white hover:bg-stone-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Stories Uploaded
                  </span>
                  <Mic className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-3xl font-mono font-bold text-neutral-900">
                  {userData.stats.storiesUploaded}
                </div>
              </div>

              {/* Stories Read */}
              <div className="p-8 bg-white hover:bg-stone-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Stories Read
                  </span>
                  <BookOpen className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-3xl font-mono font-bold text-neutral-900">
                  {userData.stats.storiesRead}
                </div>
              </div>

              {/* Total Listens */}
              <div className="p-8 bg-white hover:bg-stone-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Total Listens
                  </span>
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-3xl font-mono font-bold text-neutral-900">
                  {userData.stats.totalListens.toLocaleString()}
                </div>
              </div>

              {/* Dialects Contributed */}
              <div className="p-8 bg-white hover:bg-stone-50 transition-colors flex-1">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Dialects
                  </span>
                  <Globe className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-3xl font-mono font-bold text-neutral-900">
                  {userData.stats.dialectsContributed}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STRIP BANNER */}
      <div className="w-full border-b border-stone-200 bg-neutral-900 text-stone-400 py-3 overflow-hidden">
        <div className="max-w-auto mx-auto px-8 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
          <span>/// Cultural Guardian</span>
          <span className="hidden md:inline">
            Member Since: {userData.joinDate}
          </span>
          <span>Preserving Heritage ///</span>
        </div>
      </div>

      {/* 3. ACHIEVEMENTS SECTION */}
      <section className="w-full bg-white border-b border-stone-200">
        <div className="max-w-auto mx-auto p-8 md:p-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="px-2 py-1 bg-stone-100 border border-stone-200 text-[10px] font-bold uppercase tracking-widest text-stone-500">
              Achievements
            </span>
            <span className="h-px flex-1 bg-stone-200"></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userData.achievements.map((achievement, idx) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 border-2 transition-all ${
                    achievement.earned
                      ? "border-orange-600 bg-orange-50"
                      : "border-stone-200 bg-stone-50 opacity-50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 mb-4 flex items-center justify-center ${
                      achievement.earned ? "bg-orange-600" : "bg-stone-300"
                    }`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-stone-600">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ACTIONS SECTION */}
      <section className="w-full bg-stone-50 border-b border-stone-200">
        <div className="max-w-auto mx-auto p-8 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Profile Stats Summary */}
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wide text-neutral-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-600" />
                Your Impact
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                You've contributed {userData.stats.storiesUploaded} stories
                across {userData.stats.dialectsContributed} dialects, reaching{" "}
                {userData.stats.totalListens.toLocaleString()} listeners. Your
                dedication to preserving oral traditions is making a real
                difference in safeguarding our cultural heritage.
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <Clock className="w-4 h-4" />
                <span>Keep contributing to climb the leaderboard!</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wide text-neutral-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/record")}
                  className="w-full px-6 py-3 bg-neutral-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Mic className="w-4 h-4" />
                  Record New Story
                </button>
                <button
                  onClick={() => navigate("/stories")}
                  className="w-full px-6 py-3 border border-stone-200 text-neutral-900 text-sm font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Browse Stories
                </button>
                <button className="w-full px-6 py-3 border border-stone-200 text-neutral-900 text-sm font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors flex items-center justify-center gap-2">
                  <Trophy className="w-4 h-4" />
                  View Leaderboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <Footer />
    </div>
  );
}
