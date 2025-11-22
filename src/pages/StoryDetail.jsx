import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Pause,
  Download,
  Share2,
  Clock,
  Calendar,
  MapPin,
  Mic,
  File,
  Sparkles,
  Waves,
  MoreHorizontal,
} from "lucide-react";

// Sample data (Unchanged)
const allStoriesData = [
  {
    id: 1,
    title: "River Guardian Legends",
    location: "Banaras, Uttar Pradesh",
    category: "Folk Tales",
    narrator: "Swami Anand",
    date: "2025-01-15",
    duration: "12:34",
    description:
      "Ancient tales of the river guardians protecting the sacred waters...",
    fullText:
      "In the ancient days, the River Ganga was said to be protected by mystical guardians who ensured its purity and sanctity. These are the stories of their eternal vigilance and the miracles they performed to preserve the river's sacred nature. Passed down through generations of monks and river-dwellers, these tales speak of a time when nature and divinity were one.",
  },
  // ... (Keep other data consistent)
];

export default function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const story =
    allStoriesData.find((s) => s.id === parseInt(id)) || allStoriesData[0];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (!story) return <div>Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-900">
      {/* 1. Glass Header */}
      <div className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-full hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-auto mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* 2. The "Hero" Card - Combined Player & Context */}
        <div className="relative overflow-hidden rounded-sm bg-white shadow-lg shadow-slate-200/50 border border-slate-100 mb-8">
          {/* Decorative Background Blur */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Left: Title & Context */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-full tracking-wide uppercase">
                  {story.category}
                </span>
                <div className="flex items-center text-xs font-medium text-slate-500">
                  <Sparkles className="w-3 h-3 mr-1 text-orange-500" />
                  AI Enhanced Audio
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                {story.title}
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                {story.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {story.location}
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {story.date}
                </div>
              </div>
            </div>

            {/* Right: The "Holographic" Player */}
            <div className="md:col-span-1 w-full">
              <div className="bg-slate-900/95 backdrop-blur-xl rounded-xl p-6 text-white shadow-xl border border-slate-800 relative overflow-hidden group">
                {/* Animated Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/20 transition-opacity duration-1000 ${
                    isPlaying ? "opacity-100" : "opacity-30"
                  }`}
                ></div>

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  {/* Visualizer Icon */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                    {isPlaying ? (
                      <Waves className="w-8 h-8 text-white animate-pulse" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </div>

                  {/* Audio Engine */}
                  <audio
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                  >
                    <source
                      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                      type="audio/mpeg"
                    />
                  </audio>

                  {/* Controls */}
                  <div className="w-full space-y-4">
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={
                          duration > 0 ? (currentTime / duration) * 100 : 0
                        }
                        onChange={handleProgressChange}
                        className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    <button
                      onClick={togglePlay}
                      className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-orange-50 transition-colors shadow-lg"
                    >
                      {isPlaying ? "PAUSE SESSION" : "START LISTENING"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: The Transcript (Paper feel) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 rounded-sm">
                  <File className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Transcription
                </h3>
                <div className="ml-auto">
                  <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="prose prose-slate max-w-none">
                <p className="text-lg leading-8 text-slate-700 font-serif">
                  {story.fullText}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Info Widgets */}
          <div className="space-y-6">
            {/* Narrator Widget */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Voice Source
                </div>
                <div className="text-lg font-bold text-slate-900">
                  {story.narrator}
                </div>
                <div className="text-sm text-slate-500 mt-1">
                  Native Speaker • Verified
                </div>
              </div>
            </div>

            {/* Technical Specs Widget */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                File Details
              </h3>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3 text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Duration</span>
                </div>
                <span className="text-sm font-mono font-bold text-slate-900">
                  {story.duration}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3 text-slate-600">
                  <Waves className="w-4 h-4" />
                  <span className="text-sm font-medium">Quality</span>
                </div>
                <span className="text-sm font-mono font-bold text-slate-900">
                  High Fi / 48kHz
                </span>
              </div>
            </div>

            {/* Action Card */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200">
              <h3 className="text-lg font-bold mb-2">
                Is this information accurate?
              </h3>
              <p className="text-orange-100 text-sm mb-4 leading-relaxed">
                Help us improve the archive by validating this translation.
              </p>
              <button className="w-full py-2.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-sm font-bold hover:bg-white/30 transition-colors">
                Verify Translation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
