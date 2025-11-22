import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Sample stories data
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
  {
    id: 2,
    title: "Harvest Festival Songs",
    location: "Pune, Maharashtra",
    category: "Songs",
    narrator: "Asha Desai",
    date: "2025-01-10",
    duration: "8:45",
    description:
      "Traditional harvest celebration songs passed down through generations...",
    fullText:
      "These songs were traditionally sung during the autumn harvest when farmers would gather to celebrate their successful crops. The melodies contain references to ancient agricultural practices and prayers for continued prosperity. Each verse tells stories of gratitude to nature and the cycles of life.",
  },
  {
    id: 3,
    title: "Traditional Craft Stories",
    location: "Indore, Madhya Pradesh",
    category: "Crafts",
    narrator: "Rajesh Kumar",
    date: "2025-01-08",
    duration: "15:20",
    description:
      "Stories of traditional handcraft techniques and their cultural significance...",
    fullText:
      "For centuries, artisans of Madhya Pradesh have mastered the art of creating intricate handicrafts. This recording documents the stories behind these crafts - how techniques were passed from father to son, the symbolism in each pattern, and how these arts connect communities to their heritage.",
  },
  {
    id: 4,
    title: "Wedding Ritual Chants",
    location: "Jaipur, Rajasthan",
    category: "Rituals",
    narrator: "Priya Sharma",
    date: "2025-01-05",
    duration: "10:15",
    description:
      "Sacred chants performed during traditional wedding ceremonies...",
    fullText:
      "Wedding ceremonies in Rajasthan are filled with sacred chants that have been recited for generations. Each chant carries blessings and sets the spiritual tone for the union of two souls. This recording preserves these ancient Sanskrit verses and their meanings for future generations.",
  },
  {
    id: 5,
    title: "Ayurvedic Recipes",
    location: "Thiruvananthapuram, Kerala",
    category: "Knowledge",
    narrator: "Dr. Vaidya",
    date: "2025-01-03",
    duration: "14:30",
    description:
      "Traditional Ayurvedic recipes and their medicinal properties...",
    fullText:
      "Ayurveda, the ancient science of life, has prescribed specific recipes and preparations for maintaining health and treating ailments. This recording documents traditional recipes that have been used for thousands of years, explaining the medicinal properties of each ingredient and their combined effects on the body.",
  },
  {
    id: 6,
    title: "Mountain Folklore",
    location: "Varanasi, Uttar Pradesh",
    category: "Folk Tales",
    narrator: "Swami Anand",
    date: "2025-01-01",
    duration: "11:50",
    description:
      "Stories of mountain spirits and ancient folklore from the Himalayas...",
    fullText:
      "The Himalayas have been home to countless spiritual traditions and folklore. These stories speak of mountain spirits, yetis, and divine beings that protect the sacred peaks. They reveal the deep connection between the mountain people and their environment.",
  },
  {
    id: 7,
    title: "River Guardian Tales Part 2",
    location: "Banaras, Uttar Pradesh",
    category: "Folk Tales",
    narrator: "Swami Anand",
    date: "2024-12-28",
    duration: "13:15",
    description:
      "Continuation of the river guardian legends with more mystical encounters...",
    fullText:
      "Following the legendary guardians deeper into their realm, this second part reveals more encounters with divine beings and miraculous interventions. The stories become more complex, dealing with themes of sacrifice, duty, and the eternal battle between preservation and change.",
  },
  {
    id: 8,
    title: "Monsoon Celebrations",
    location: "Pune, Maharashtra",
    category: "Songs",
    narrator: "Asha Desai",
    date: "2024-12-25",
    duration: "9:30",
    description: "Songs celebrating the arrival of monsoon season...",
    fullText:
      "When the monsoon rains arrive, entire communities gather to celebrate. These songs capture the joy and relief of farmers seeing their fields watered, the romance of rain, and the renewal of life. The rhythms mimic the patterns of rainfall and the energies of nature.",
  },
];

export default function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const story = allStoriesData.find((s) => s.id === parseInt(id));

  if (!story) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Story not found
          </h2>
          <button
            onClick={() => navigate("/stories")}
            className="text-terracotta hover:underline"
          >
            Go back to stories
          </button>
        </div>
      </div>
    );
  }

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
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-stone-200 flex-shrink-0">
        <button
          onClick={() => navigate("/stories")}
          className="text-xs text-terracotta hover:underline mb-4"
        >
          ← Back to Archive
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
          {story.title}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-neutral-600">
          By {story.narrator}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-4xl space-y-8">
          {/* Story Info Card */}
          <div className="border border-stone-200 p-6 sm:p-8 rounded-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pb-6 border-b border-stone-100">
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  Location
                </div>
                <div className="text-sm font-mono text-neutral-900">
                  📍 {story.location}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  Category
                </div>
                <div className="text-sm font-semibold text-neutral-900">
                  {story.category}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  Duration
                </div>
                <div className="text-sm font-mono text-neutral-900">
                  {story.duration}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  Date Recorded
                </div>
                <div className="text-sm font-mono text-neutral-900">
                  {story.date}
                </div>
              </div>
            </div>

            <p className="text-sm text-neutral-700 leading-relaxed">
              {story.description}
            </p>
          </div>

          {/* Audio Player */}
          <div className="border border-stone-200 p-6 sm:p-8 rounded-sm space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                Listen to Recording
              </h2>

              {/* Audio element (hidden) */}
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

              {/* Waveform placeholder */}
              <div className="bg-neutral-50 border border-stone-200 rounded-sm h-32 flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-4xl text-neutral-300 mb-2">🎵</div>
                  <div className="text-xs text-neutral-500">
                    {isPlaying ? "Playing..." : "Ready to play"}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={duration > 0 ? (currentTime / duration) * 100 : 0}
                  onChange={handleProgressChange}
                  className="w-full cursor-pointer accent-terracotta"
                />
              </div>

              {/* Time Display */}
              <div className="flex items-center justify-between text-xs text-neutral-600 font-mono mb-6">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Player Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-terracotta text-white font-semibold rounded-sm hover:bg-orange-600 transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                      Pause
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Play
                    </>
                  )}
                </button>

                <button className="flex items-center gap-2 px-4 py-3 border border-stone-200 text-neutral-900 text-sm font-medium rounded-sm hover:bg-stone-50 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2m0 0v-8m0 8H3m6-8h12"
                    />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* Full Text / Transcript */}
          <div className="border border-stone-200 p-6 sm:p-8 rounded-sm">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Story Text
            </h2>
            <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">
              {story.fullText}
            </p>
          </div>

          {/* Metadata */}
          <div className="border border-stone-200 p-6 sm:p-8 rounded-sm">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Story Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  Recorded by
                </div>
                <div className="text-neutral-900">{story.narrator}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  Recording Date
                </div>
                <div className="text-neutral-900 font-mono">{story.date}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  Location
                </div>
                <div className="text-neutral-900">{story.location}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  Duration
                </div>
                <div className="text-neutral-900 font-mono">
                  {story.duration}
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  Category
                </div>
                <div className="inline-block bg-stone-100 px-3 py-1 rounded-sm text-neutral-900">
                  {story.category}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
