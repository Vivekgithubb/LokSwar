import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Sample stories data with locations
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

  // Extract location from query params if passed from map
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

    // Filter by location
    if (loc) {
      filtered = filtered.filter((story) => story.location === loc);
    }

    // Filter by search query
    if (query.trim()) {
      filtered = filtered.filter(
        (story) =>
          story.title.toLowerCase().includes(query.toLowerCase()) ||
          story.narrator.toLowerCase().includes(query.toLowerCase()) ||
          story.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter((story) => story.category === category);
    }

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
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-stone-200 flex-shrink-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
          Archive
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-neutral-600">
          Browse all uploaded stories and oral traditions
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="space-y-6">
          {/* Filters */}
          <div className="border border-stone-200 p-4 sm:p-6 rounded-sm space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 mb-2">
                Search Stories
              </label>
              <input
                type="text"
                placeholder="Search by title, narrator, or keywords..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation || ""}
                  onChange={(e) => handleLocationChange(e.target.value || null)}
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Stories Grid */}
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStories.map((story) => (
                <div
                  key={story.id}
                  className="border border-stone-200 p-4 sm:p-6 rounded-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-base font-semibold text-neutral-900 mb-2">
                    {story.title}
                  </h3>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="text-xs text-neutral-600">
                      📍 <span className="mono">{story.location}</span>
                    </div>
                    <div className="text-xs text-neutral-600">
                      👤 <span className="mono">{story.narrator}</span>
                    </div>
                    <div className="text-xs text-neutral-600">
                      🏷️{" "}
                      <span className="inline-block bg-stone-100 px-2 py-1 rounded-sm">
                        {story.category}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-600">
                      ⏱️ <span className="mono">{story.duration}</span> •{" "}
                      {story.date}
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 line-clamp-2 mb-4">
                    {story.description}
                  </p>

                  <button
                    onClick={() => navigate(`/story/${story.id}`)}
                    className="w-full px-3 py-2 bg-terracotta text-white text-xs font-medium rounded-sm hover:bg-orange-600 transition-colors"
                  >
                    Listen Now
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-neutral-500 text-sm mb-2">
                No stories found
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLocation(null);
                  setSelectedCategory("All");
                  filterStories(null, "", "All");
                }}
                className="text-xs text-terracotta hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
