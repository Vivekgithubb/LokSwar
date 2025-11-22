import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom blue marker icon
const blueMarkerIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Sample data with multiple stories per location
const storiesData = [
  {
    id: 1,
    title: "River Guardian Legends",
    category: "Folk Tales",
    count: 47,
    location: "Banaras, Uttar Pradesh",
    lat: 25.3245,
    lng: 83.0085,
    color: "#3B82F6",
  },
  {
    id: 2,
    title: "Harvest Festival Songs",
    category: "Songs",
    count: 32,
    location: "Pune, Maharashtra",
    lat: 18.5204,
    lng: 73.8567,
    color: "#3B82F6",
  },
  {
    id: 3,
    title: "Traditional Craft Stories",
    category: "Crafts",
    count: 28,
    location: "Indore, Madhya Pradesh",
    lat: 22.7196,
    lng: 75.8577,
    color: "#3B82F6",
  },
  {
    id: 4,
    title: "Wedding Ritual Chants",
    category: "Rituals",
    count: 41,
    location: "Jaipur, Rajasthan",
    lat: 26.9124,
    lng: 75.7873,
    color: "#3B82F6",
  },
  {
    id: 5,
    title: "Ayurvedic Recipes",
    category: "Knowledge",
    count: 35,
    location: "Thiruvananthapuram, Kerala",
    lat: 8.5241,
    lng: 76.9366,
    color: "#3B82F6",
  },
  {
    id: 6,
    title: "Mountain Folklore",
    category: "Folk Tales",
    count: 22,
    location: "Varanasi, Uttar Pradesh",
    lat: 25.3201,
    lng: 82.9876,
    color: "#3B82F6",
  },
];

export default function MapExplorer() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filteredStories, setFilteredStories] = useState(storiesData);
  const mapRef = useRef(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredStories(storiesData);
    } else {
      const filtered = storiesData.filter(
        (story) =>
          story.location.toLowerCase().includes(query.toLowerCase()) ||
          story.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStories(filtered);
    }
  };

  const handleLocationClick = (story) => {
    setSelectedLocation(story);
    // Navigate to Stories page with location filter
    navigate(`/stories?location=${encodeURIComponent(story.location)}`);
  };

  const handleMarkerClick = (story) => {
    setSelectedLocation(story);
    // Zoom to marker (no navigation)
    if (mapRef.current) {
      mapRef.current.setView([story.lat, story.lng], 10);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-stone-200 flex-shrink-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
          Cultural Atlas
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-neutral-600">
          Interactive map of oral traditions across India
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="border border-stone-200 h-full flex flex-col lg:flex-row">
          {/* Sidebar - Story Locations */}
          <aside className="w-full lg:w-80 lg:border-r border-stone-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-stone-200 flex-shrink-0">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-neutral-900">
                  Story Locations
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  {filteredStories.length} regions mapped
                </p>
              </div>
              <input
                type="text"
                placeholder="Search locations or stories..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Stories List */}
            <div className="flex-1 overflow-y-auto">
              {filteredStories.length > 0 ? (
                filteredStories.map((story) => (
                  <div
                    key={story.id}
                    id={`story-${story.id}`}
                    onClick={() => handleLocationClick(story)}
                    className={`p-4 border-b border-stone-100 cursor-pointer transition-colors ${
                      selectedLocation?.id === story.id
                        ? "bg-blue-50 border-l-4 border-l-blue-500"
                        : "hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-neutral-900 text-sm">
                        {story.title}
                      </h3>
                      <span className="text-xs font-mono text-terracotta font-semibold ml-2">
                        {story.count}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-600 mono">
                      📍 {story.location}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">
                      {story.category}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-neutral-500 text-sm">
                  No stories found
                </div>
              )}
            </div>
          </aside>

          {/* Map */}
          <div className="flex-1 bg-neutral-50 min-h-96 lg:min-h-auto relative hidden lg:block">
            <MapContainer
              ref={mapRef}
              center={[20.5937, 78.9629]}
              zoom={5}
              style={{ height: "100%", width: "100%" }}
              className="z-10"
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              {filteredStories.map((story) => (
                <Marker
                  key={story.id}
                  position={[story.lat, story.lng]}
                  icon={blueMarkerIcon}
                  eventHandlers={{
                    click: () => handleMarkerClick(story),
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-2">
                      <div className="font-semibold text-sm">{story.title}</div>
                      <div className="text-xs text-neutral-600 mt-1">
                        {story.location}
                      </div>
                      <div className="text-xs text-neutral-600">
                        {story.count} stories
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Mobile Map Preview (shown below on small screens) */}
          <div className="lg:hidden mt-4 border-t border-stone-200 pt-4">
            <div className="bg-neutral-50 border border-stone-200 rounded-sm h-64 flex items-center justify-center">
              <div className="text-center text-neutral-500 text-sm">
                {selectedLocation ? (
                  <div>
                    <div className="text-lg font-semibold text-neutral-900 mb-2">
                      {selectedLocation.title}
                    </div>
                    <div className="text-xs">
                      📍 {selectedLocation.location}
                    </div>
                    <div className="text-xs mt-1">
                      {selectedLocation.count} stories available
                    </div>
                  </div>
                ) : (
                  "Select a location to view details"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
