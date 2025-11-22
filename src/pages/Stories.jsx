import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Mic,
  Calendar,
  Clock,
  Play,
  Filter,
  X,
  Volume2,
  Radio,
  CheckCircle2,
} from "lucide-react";

// Sample stories data (Unchanged)
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
  },
];

export default function Stories() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredStories, setFilteredStories] = useState(allStoriesData);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Logic Unchanged
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const locParam = params.get("location");
    if (locParam) {
      setSelectedLocation(locParam);
      filterStories(locParam, searchQuery, selectedCategory);
    }
  }, [location.search]);

  const filterStories = (loc, query, category) => {
    let filtered = allStoriesData;
    if (loc) filtered = filtered.filter((story) => story.location === loc);
    if (query.trim()) {
      filtered = filtered.filter(
        (story) =>
          story.title.toLowerCase().includes(query.toLowerCase()) ||
          story.narrator.toLowerCase().includes(query.toLowerCase()) ||
          story.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (category !== "All")
      filtered = filtered.filter((story) => story.category === category);
    setFilteredStories(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterStories(selectedLocation, query, selectedCategory);
  };

  const handleLocationChange = (loc) => {
    setSelectedLocation(loc);
    filterStories(loc, searchQuery, selectedCategory);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    filterStories(selectedLocation, searchQuery, cat);
  };

  const categories = ["All", ...new Set(allStoriesData.map((s) => s.category))];
  const locations = [...new Set(allStoriesData.map((s) => s.location))];

  return (
    <div className="w-full h-full flex flex-col bg-stone-50">
      {/* Header */}
      <div className="w-full bg-white border-b border-stone-200 sticky top-0 z-20">
        <div className="px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-end">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Archive Registry
            </h1>
            <p className="mt-1 text-xs font-mono text-stone-500 uppercase tracking-wider">
              System Status: Online • {allStoriesData.length} Records Loaded
            </p>
          </div>
          <div className="hidden sm:block">
            <span className="inline-flex items-center px-3 py-1 bg-orange-600 text-xs font-mono text-white rounded-full shadow-sm">
              {filteredStories.length} RESULTS
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="max-w-auto mx-auto px-4 sm:px-6 lg:px-8 py-1 ">
          {/* Filter Bar */}
          <div className="bg-white border border-stone-200 p-1 rounded-sm shadow-sm sticky top-2 z-10">
            <div className="flex flex-col md:flex-row gap-0 md:divide-x divide-stone-200">
              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-stone-400 group-focus-within:text-orange-600 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search by keywords, narrator..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-none text-sm text-neutral-900 placeholder-stone-400 focus:outline-none focus:ring-0 bg-transparent"
                />
              </div>
              <div className="md:w-1/4 relative group border-t md:border-t-0 border-stone-100">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-stone-400 group-focus-within:text-orange-600 transition-colors" />
                </div>
                <select
                  value={selectedLocation || ""}
                  onChange={(e) => handleLocationChange(e.target.value || null)}
                  className="block w-full pl-10 pr-8 py-3 border-none text-sm text-neutral-900 focus:outline-none focus:ring-0 bg-transparent appearance-none cursor-pointer truncate"
                >
                  <option value="">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Filter className="h-3 w-3 text-stone-400" />
                </div>
              </div>
              <div className="md:w-1/5 relative group border-t md:border-t-0 border-stone-100">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-4 w-4 text-stone-400 group-focus-within:text-orange-600 transition-colors" />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="block w-full pl-10 pr-8 py-3 border-none text-sm text-neutral-900 focus:outline-none focus:ring-0 bg-transparent appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Filter className="h-3 w-3 text-stone-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px  bg-stone-200 border border-stone-200">
              {filteredStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white group hover:bg-stone-50 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                >
                  {/* Hover Accent Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />

                  {/* 1. VISUAL HEADER (Generative Pattern) */}
                  <div className="h-32 w-full bg-stone-100 relative overflow-hidden border-b border-stone-100">
                    {/* Abstract Waveform Lines */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                      <svg
                        className="w-full h-full text-neutral-900"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 10 Q 10 5, 20 10 T 40 10 T 60 10 T 80 10 T 100 10"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                        <path
                          d="M0 10 Q 10 15, 20 10 T 40 10 T 60 10 T 80 10 T 100 10"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                        <path
                          d="M0 12 Q 10 2, 20 12 T 40 12 T 60 12 T 80 12 T 100 12"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="0.5"
                        />
                      </svg>
                    </div>

                    {/* Overlay Tags */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2 py-1 bg-white/90 backdrop-blur border border-stone-200 text-[10px] font-bold uppercase tracking-widest text-stone-600 rounded-sm">
                        <Radio className="w-3 h-3 mr-1.5 text-orange-600" />
                        {story.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-between items-end">
                        <span className="font-mono text-[10px] text-stone-500 bg-white/80 px-1 rounded">
                          REF: {story.id.toString().padStart(4, "0")}
                        </span>
                        {/* Fake "Verified" Badge */}
                        <span className="text-orange-600 flex items-center gap-1 text-[10px] font-bold bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100">
                          <CheckCircle2 className="w-3 h-3" /> VERIFIED
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    {/* Title Area */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-neutral-900 leading-tight group-hover:text-orange-700 transition-colors">
                        {story.title}
                      </h3>
                    </div>

                    {/* 2. STRUCTURED METADATA BLOCKS */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {/* Block 1: Narrator */}
                      <div className="border-l-2 border-stone-100 pl-3">
                        <div className="text-[10px] uppercase tracking-widest text-stone-400 mb-1 font-semibold">
                          Narrator
                        </div>
                        <div className="text-xs font-medium text-neutral-700 flex items-center">
                          <Mic className="w-3 h-3 mr-1.5 text-stone-400" />
                          {story.narrator}
                        </div>
                      </div>

                      {/* Block 2: Location */}
                      <div className="border-l-2 border-stone-100 pl-3">
                        <div className="text-[10px] uppercase tracking-widest text-stone-400 mb-1 font-semibold">
                          Region
                        </div>
                        <div className="text-xs font-medium text-neutral-700 flex items-center truncate">
                          <MapPin className="w-3 h-3 mr-1.5 text-stone-400" />
                          <span className="truncate">
                            {story.location.split(",")[0]}
                          </span>
                        </div>
                      </div>

                      {/* Block 3: Date */}
                      <div className="border-l-2 border-stone-100 pl-3">
                        <div className="text-[10px] uppercase tracking-widest text-stone-400 mb-1 font-semibold">
                          Recorded
                        </div>
                        <div className="text-xs font-mono text-neutral-600 flex items-center">
                          <Calendar className="w-3 h-3 mr-1.5 text-stone-400" />
                          {story.date}
                        </div>
                      </div>

                      {/* Block 4: Duration */}
                      <div className="border-l-2 border-stone-100 pl-3">
                        <div className="text-[10px] uppercase tracking-widest text-stone-400 mb-1 font-semibold">
                          Length
                        </div>
                        <div className="text-xs font-mono text-neutral-600 flex items-center">
                          <Clock className="w-3 h-3 mr-1.5 text-stone-400" />
                          {story.duration}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-neutral-600 line-clamp-2 mb-6 font-sans leading-relaxed flex-grow border-t border-stone-100 pt-4">
                      {story.description}
                    </p>

                    {/* Action Button */}
                    <button
                      onClick={() => navigate(`/story/${story.id}`)}
                      className="w-full py-3 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg mt-auto rounded-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      Listen story
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State (Unchanged)
            <div className="flex flex-col items-center justify-center py-20 border border-stone-200 border-dashed rounded-sm bg-stone-50/50">
              <div className="p-4 bg-stone-100 rounded-full mb-4">
                <X className="w-6 h-6 text-stone-400" />
              </div>
              <h3 className="text-neutral-900 font-medium mb-1">
                No records found
              </h3>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLocation(null);
                  setSelectedCategory("All");
                  filterStories(null, "", "All");
                }}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wider border-b border-orange-200 hover:border-orange-600 pb-0.5 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
