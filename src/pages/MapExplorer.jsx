import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Map as MapIcon, List as ListIcon, Search } from "lucide-react"; // Assuming you have lucide-react, or use standard text

// --- Configuration & Icons ---
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

const storiesData = [
  {
    id: 1,
    title: "River Guardian Legends",
    category: "Folk Tales",
    count: 47,
    location: "Banaras, Uttar Pradesh",
    lat: 25.3245,
    lng: 83.0085,
  },
  {
    id: 2,
    title: "Harvest Festival Songs",
    category: "Songs",
    count: 32,
    location: "Pune, Maharashtra",
    lat: 18.5204,
    lng: 73.8567,
  },
  {
    id: 3,
    title: "Traditional Craft Stories",
    category: "Crafts",
    count: 28,
    location: "Indore, Madhya Pradesh",
    lat: 22.7196,
    lng: 75.8577,
  },
  {
    id: 4,
    title: "Wedding Ritual Chants",
    category: "Rituals",
    count: 41,
    location: "Jaipur, Rajasthan",
    lat: 26.9124,
    lng: 75.7873,
  },
  {
    id: 5,
    title: "Ayurvedic Recipes",
    category: "Knowledge",
    count: 35,
    location: "Thiruvananthapuram, Kerala",
    lat: 8.5241,
    lng: 76.9366,
  },
  {
    id: 6,
    title: "Mountain Folklore",
    category: "Folk Tales",
    count: 22,
    location: "Varanasi, Uttar Pradesh",
    lat: 25.3201,
    lng: 82.9876,
  },
];

// --- Helper Component to Recenter Map Programmatically ---
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 10, { animate: true });
    }
  }, [center, map]);
  return null;
}

export default function MapExplorer() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filteredStories, setFilteredStories] = useState(storiesData);

  // RESPONSIVE STATE: 'list' or 'map'
  const [mobileView, setMobileView] = useState("list");

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
    // On mobile, if they click a list item, switch to map to show them where it is
    if (window.innerWidth < 1024) {
      setMobileView("map");
    }
  };

  // Handle Marker Click (Navigate to details)
  const handleMarkerClick = (story) => {
    // navigate(`/stories?location=${encodeURIComponent(story.location)}`);
    // Or just select it
    setSelectedLocation(story);
  };

  return (
    // Use h-[calc(100vh-theme(spacing.16))] or fixed height to ensure scroll works correctly
    <div className="w-full h-[calc(100vh-64px)] flex flex-col bg-stone-50">
      {/* Header */}
      <header className="px-4 py-4 border-b border-stone-200 bg-white flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Cultural Atlas
          </h1>
          <p className="hidden sm:block text-xs text-neutral-500 mt-1">
            Interactive map of oral traditions
          </p>
        </div>

        {/* MOBILE TOGGLE BUTTONS (Visible only on < lg) */}
        <div className="flex lg:hidden bg-stone-100 p-1 rounded-md border border-stone-200">
          <button
            onClick={() => setMobileView("list")}
            className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-sm transition-all ${
              mobileView === "list"
                ? "bg-white text-neutral-900 shadow-sm border border-stone-200"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <ListIcon className="w-3 h-3 mr-1.5" /> Stories
          </button>
          <button
            onClick={() => setMobileView("map")}
            className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-sm transition-all ${
              mobileView === "map"
                ? "bg-white text-neutral-900 shadow-sm border border-stone-200"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <MapIcon className="w-3 h-3 mr-1.5" /> Map
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR (List View) 
            - Hidden on mobile if view is 'map'
            - Always block on Desktop (lg)
        */}
        <aside
          className={`
            flex-col border-r border-stone-200 bg-white w-full lg:w-96 transition-all
            ${mobileView === "map" ? "hidden lg:flex" : "flex"}
          `}
        >
          {/* Search Bar */}
          <div className="p-4 border-b border-stone-200 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search regions..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 text-neutral-900 placeholder:text-stone-400 focus:outline-none focus:border-neutral-400 transition-colors"
              />
            </div>
            <div className="mt-3 flex justify-between items-end">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                {filteredStories.length} LOCATIONS FOUND
              </span>
            </div>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {filteredStories.length > 0 ? (
              filteredStories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => handleLocationClick(story)}
                  className={`
                    group p-4 border-b border-stone-100 cursor-pointer transition-all
                    ${
                      selectedLocation?.id === story.id
                        ? "bg-stone-50 border-l-4 border-l-orange-600"
                        : "hover:bg-stone-50 border-l-4 border-l-transparent"
                    }
                  `}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-neutral-900 text-sm group-hover:text-orange-700 transition-colors">
                      {story.title}
                    </h3>
                    <span className="text-[10px] font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-600">
                      {story.count}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 mt-1 font-mono">
                    {story.location}
                  </div>
                  <div className="mt-2 inline-block px-2 py-0.5 text-[10px] border border-stone-200 rounded-full text-stone-500 uppercase tracking-wide">
                    {story.category}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-stone-400 text-sm">
                No results found.
              </div>
            )}
          </div>
        </aside>

        {/* MAP AREA 
            - Hidden on mobile if view is 'list'
            - Always block on Desktop (lg)
        */}
        <main
          className={`
            flex-1 relative bg-stone-100
            ${mobileView === "list" ? "hidden lg:block" : "block"}
          `}
        >
          {/* Desktop Overlay info (optional) */}
          <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur border border-stone-200 p-2 shadow-sm rounded-sm hidden lg:block">
            <div className="text-[10px] uppercase tracking-widest text-stone-500">
              Live Atlas Status
            </div>
            <div className="text-xs font-mono">
              System Online • {filteredStories.length} Pins Active
            </div>
          </div>

          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            {/* Helper to programmatically move map when list item clicked */}
            {selectedLocation && (
              <MapUpdater
                center={[selectedLocation.lat, selectedLocation.lng]}
              />
            )}

            {filteredStories.map((story) => (
              <Marker
                key={story.id}
                position={[story.lat, story.lng]}
                icon={blueMarkerIcon}
                eventHandlers={{ click: () => handleMarkerClick(story) }}
              >
                <Popup className="rounded-none border border-stone-200 shadow-none">
                  <div className="font-sans min-w-[150px]">
                    <div className="text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wide border-b border-stone-100 pb-1">
                      {story.category}
                    </div>
                    <h3 className="text-sm font-semibold text-orange-700">
                      {story.title}
                    </h3>
                    <div className="text-xs text-stone-500 mt-1 font-mono">
                      {story.location}
                    </div>
                    <button
                      onClick={() => navigate(`/story/${story.id}`)}
                      className="mt-2 w-full bg-neutral-900 text-white text-[10px] py-1.5 px-2 hover:bg-neutral-800 uppercase tracking-wider transition-colors"
                    >
                      View Archive
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </main>
      </div>
    </div>
  );
}
