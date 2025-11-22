# LokSwar Frontend - Complete Documentation

**Project Name:** LokSwar - The Indian Archive  
**Version:** 0.1.0  
**Last Updated:** November 22, 2025  
**Status:** Feature-complete frontend with responsive design

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture & Project Structure](#architecture--project-structure)
4. [Design System](#design-system)
5. [Features Implemented](#features-implemented)
6. [Page-by-Page Documentation](#page-by-page-documentation)
7. [Component Documentation](#component-documentation)
8. [Key Technical Decisions](#key-technical-decisions)
9. [Dependencies Explanation](#dependencies-explanation)
10. [Development Notes](#development-notes)
11. [Next Steps & Future Enhancements](#next-steps--future-enhancements)

---

## Project Overview

**LokSwar** is a digital repository dedicated to preserving India's disappearing oral traditions, folk tales, and indigenous knowledge. The platform enables:

- **Recording & Upload** of audio stories from community members
- **Interactive Mapping** of stories across India's regions
- **Searchable Archive** of all uploaded stories
- **Audio Playback** with full player controls
- **Community Registry** to recognize contributors

### Core Mission

To create a living archive of India's intangible cultural heritage before these voices fade into silence. Every recording is a cultural artifact; every upload is an act of preservation.

---

## Tech Stack

### Frontend Framework

- **React 18.2.0** - Component-based UI library
- **Vite 5.1.0** - Ultra-fast build tool and dev server
- **Tailwind CSS 3.4.5** - Utility-first CSS framework

### Routing & State

- **React Router DOM 6.14.1** - Client-side navigation
- **Local State (useState)** - Page and component-level state management

### Libraries & Integrations

- **WaveSurfer.js 7.0.0** - Audio waveform visualization & playback
- **Leaflet 1.9.4** - Interactive map library
- **React Leaflet 4.2.1** - React wrapper for Leaflet
- **Framer Motion 10.12.7** - Animation library (included for future use)
- **PostCSS + Autoprefixer** - CSS preprocessing and vendor prefixing

### Build & Development

- **@vitejs/plugin-react 5.1.0** - React fast refresh for Vite
- **Module Type: ESM** - ES Modules enabled in package.json

---

## Architecture & Project Structure

```
d:\Lokswar\
├── public/                          # Static assets
├── src/
│   ├── App.jsx                      # Main app with routing
│   ├── main.jsx                     # React entry point
│   ├── index.css                    # Global Tailwind CSS
│   ├── components/
│   │   ├── Navbar.jsx               # Navigation header
│   │   └── Recorder.jsx             # Audio recording interface
│   ├── pages/
│   │   ├── Landing.jsx              # Hero & mission statement
│   │   ├── Recording.jsx            # Recording form + recorder
│   │   ├── MapExplorer.jsx          # Interactive map with search
│   │   ├── Stories.jsx              # Stories archive with filters
│   │   ├── StoryDetail.jsx          # Story player & full info
│   │   └── Leaderboard.jsx          # Contributors registry
│   └── [other files]
├── index.html                       # HTML entry point
├── package.json                     # Dependencies
├── vite.config.js                   # Vite configuration
├── tailwind.config.cjs              # Tailwind configuration
├── postcss.config.cjs               # PostCSS configuration
└── README.md
```

### Key Decision: File Organization

- **Pages** contain full-page routes
- **Components** are reusable elements (Navbar, Recorder)
- **No API layer yet** - all data is mocked in components (ready for backend integration)

---

## Design System

### Design Philosophy

Inspired by **Manifold Bio** aesthetic:

- **Borders over shadows** - Clean, instrument-like appearance
- **Monospace for data** - Technical, precise feel for metadata
- **Terracotta accent** (#FF6B35) - Cultural warmth
- **Stone/Gray palette** - Neutral, professional foundation

### Color Palette

| Color       | Tailwind                            | Usage                               |
| ----------- | ----------------------------------- | ----------------------------------- |
| Terracotta  | `text-terracotta` / `bg-terracotta` | #FF6B35 - CTAs, accents, highlights |
| Neutral 900 | `text-neutral-900`                  | #171717 - Headlines, dark text      |
| Neutral 600 | `text-neutral-600`                  | #525252 - Body text, descriptions   |
| Stone 200   | `border-stone-200`                  | #e7e5e4 - Borders, dividers         |
| Stone 50    | `bg-stone-50`                       | #fafaf8 - Subtle backgrounds        |

### Typography

| Element       | Font                   | Size    | Weight |
| ------------- | ---------------------- | ------- | ------ |
| Logo          | Space Grotesk (custom) | 24px    | 500    |
| Page Headers  | Inter                  | 24-48px | 700    |
| Body          | Inter                  | 14-16px | 400    |
| Metadata/Data | Courier/Monospace      | 12-14px | 400    |
| Captions      | Inter                  | 12px    | 400    |

**Fonts loaded in `index.html`:**

- Inter (main)
- Space Grotesk (branding)
- Merriweather (serif for philosophy text)

### Responsive Breakpoints (Tailwind)

- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up

---

## Features Implemented

### 1. ✅ Landing Page (`/`)

**Purpose:** Introduce the mission, establish visual identity, provide CTAs

**Components:**

- Hero section with terracotta accent on "of India"
- Status card showing archive metrics (stories, dialects, villages)
- Three metric cards (dialects preserved, villages mapped, active guardians)
- "Why This Matters" section with mission narrative
- Full-bleed "Become a Guardian" CTA section

**Design Decisions:**

- Full-width edge-to-edge sections with inner max-width constraints
- Large typography (48-56px) for hero impact
- Responsive grid layout (md:grid-cols-10 for hero)
- Terracotta accent used sparingly for emphasis

---

### 2. ✅ Recording Studio (`/record`)

**Purpose:** Allow users to record and upload stories with metadata

**Components:**

- Metadata form (left column on desktop)
  - Story title, location, dialect, category
  - Narrator information, description
- Audio recording interface (right column on desktop)
  - Real-time waveform visualization
  - Start/Stop/Play controls
  - Upload file button
  - Submit to Archive button

**Key Technical Decision: useRef in Recorder Component**

```javascript
- waveformRef: DOM container for WaveSurfer visualization
- wsRef: WaveSurfer instance (persistent, no re-renders)
- mediaRecorderRef: Browser MediaRecorder API
- chunksRef: Audio data chunks (accumulates without re-renders)
```

**Why useRef?** These are library instances and browser APIs that:

- Don't need to trigger React re-renders
- Require persistent references across render cycles
- Would be inefficient/impossible with useState

**Responsive Behavior:**

- Mobile: Form + recorder stack vertically
- Desktop (lg:): Two-column layout with border divider
- Form grid: 1 column on mobile → 2 columns at sm:

---

### 3. ✅ Cultural Atlas (`/map`)

**Purpose:** Interactive exploration of stories by geographic location

**Components:**

- Sidebar with story locations (left, fixed width on desktop)
  - Search input to filter by location or story title
  - List of story collections with counts
  - Selected state highlight with blue accent
  - Auto-scroll on selection
- Interactive Leaflet map (right, full-size on desktop)
  - Blue markers for each location
  - Click marker to zoom in (level 10) without navigation
  - Click sidebar item to zoom AND navigate to Stories page
  - Popup with story details

**Key Technical Decision: Map Interaction**

- **Marker click** → Zoom only (no navigation) - allows exploration
- **Sidebar click** → Navigate to Stories with location filter
- **Mobile** → Shows sidebar only; selected location preview below

**Why This Split?**

- Users want to explore the map freely before committing to a filtered view
- Clicking highlighted stories is intentional navigation action
- Mobile experience optimized for vertical scrolling

**useRef Usage:**

```javascript
const mapRef = useRef(null);
// Used to call mapRef.current.setView([lat, lng], zoom)
// Direct control of Leaflet library without re-renders
```

---

### 4. ✅ Stories Archive (`/stories`)

**Purpose:** Browse, search, and filter all uploaded stories

**Components:**

- Filter bar with search + location + category dropdowns
- Responsive grid of story cards (1 col mobile → 3 col desktop)
- Each card shows:
  - Title, location, narrator, category badge
  - Duration, date, brief description
  - "Listen Now" button

**Smart Features:**

- Location pre-filter from map (via URL params: `?location=...`)
- Real-time search across title, narrator, description
- Category filter with dynamic list from data
- "Clear filters" button for reset
- "No stories found" state with helpful message

**Responsive Grid:**

```tailwind
grid-cols-1          /* Mobile */
sm:grid-cols-2       /* Tablet */
lg:grid-cols-3       /* Desktop */
```

---

### 5. ✅ Story Detail Player (`/story/:id`)

**Purpose:** Full story information page with audio player

**Components:**

- Back navigation button
- Story metadata card (location, category, duration, date)
- **Full Audio Player** with:
  - Play/Pause button (toggles state)
  - Progress bar (scrubbing with mouse)
  - Current time / Total duration display
  - Download button (wired UI, ready for backend)
- Story full text / transcript section
- Complete story metadata grid

**Key Technical Decision: Audio Control with useRef**

```javascript
const audioRef = useRef(null);

// Methods called directly on DOM element
audioRef.current.play()
audioRef.current.pause()
audioRef.current.currentTime = newTime  // Seek

// Event listeners for tracking state
onTimeUpdate → setCurrentTime()
onLoadedMetadata → setDuration()
```

**Why Not useState for audio?**

- Calling browser APIs (`play()`, `pause()`) doesn't require state
- Setting `currentTime` is a direct property modification
- State tracks UI (isPlaying, currentTime) separately from DOM

**Responsive Design:**

- All sections stack on mobile
- Metadata grid: 2 columns on mobile → 4 columns on desktop
- Audio player takes full width

---

### 6. ✅ Navbar

**Purpose:** Main navigation across all pages

**Links:**

- Logo + "LokSwar - The Indian Archive"
- Home, Record, Atlas, Archive, Registry

**Design:**

- Sticky positioning
- Backdrop blur effect
- Terracotta mic icon in logo
- Responsive text spacing

---

### 7. ✅ Leaderboard (`/leaders`)

**Purpose:** Community contributor registry

**Features:**

- Responsive table (horizontal scroll on mobile)
- Dense information layout
- Contributor stats and rankings

---

## Page-by-Page Documentation

### Landing Page (`Landing.jsx`)

**Structure:**

```jsx
// Full-bleed sections approach
<div className="w-full">
  <section className="w-full border-b">
    <div className="max-w-auto mx-auto p-8">
      {/* Hero content constrained to max-width inside full-width container */}
    </div>
  </section>

  <section className="w-full bg-terracotta">
    {/* Full-width terracotta background */}
  </section>
</div>
```

**Data:**

- All content is hardcoded (no API calls)
- Metric values: 1,240 stories, 87 dialects, 342 villages, 156 guardians
- Mission text emphasizes preservation and community

**Customization:**

- Update metrics in the status card (lines ~80-110)
- Change mission text in "Why This Matters" section (lines ~200+)
- CTA link href can be wired to actual recording page

---

### Recording Page (`Recording.jsx`)

**State Management:**

```javascript
// All form data is in uncontrolled inputs (no useState)
// Ready for form submission handling
```

**Key Structure:**

```jsx
<div className="w-full h-full flex flex-col">
  {/* Header with title */}
  <div className="flex-1 overflow-y-auto">
    <div className="border grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Form fields */}
      {/* Right: Recorder component */}
    </div>
  </div>
</div>
```

**Form Fields:**

- title, location, dialect, category, narrator, description
- All inputs use name attributes (ready for FormData collection)

**Recorder Integration:**

- `<Recorder />` component handles all audio logic
- Button handlers: Start/Stop Recording, Upload File, Submit to Archive

**Next Step:**

- Wire form submission to backend upload endpoint
- Collect form data with FormData API
- POST audio blob + metadata to backend

---

### Map Explorer (`MapExplorer.jsx`)

**Data Structure:**

```javascript
const storiesData = [
  {
    id: 1,
    title: "...",
    location: "Banaras, Uttar Pradesh",
    category: "Folk Tales",
    count: 47,
    lat: 25.3245,
    lng: 83.0085,
  },
  // ... more locations
];
```

**Key Features:**

1. **Search Functionality:**

   ```javascript
   handleSearch(query) {
     // Filters storiesData by location or title
     // Updates filteredStories state
   }
   ```

2. **Map Interaction:**

   ```javascript
   // Click marker: zoom only
   handleMarkerClick(story) {
     mapRef.current.setView([lat, lng], 10)
   }

   // Click sidebar: navigate to Stories with filter
   handleLocationClick(story) {
     navigate(`/stories?location=${story.location}`)
   }
   ```

3. **Custom Marker:**
   - Blue icon from Leaflet color markers CDN
   - Popup shows story details on click

**Responsive Behavior:**

- Desktop (lg:): Sidebar + Map side-by-side
- Mobile: Sidebar only; selected item preview below

**Backend Integration:**

- Replace storiesData with API call: `GET /api/locations`
- Add real coordinates from database

---

### Stories Archive (`Stories.jsx`)

**Data Structure:**

```javascript
const allStoriesData = [
  {
    id: 1,
    title: "...",
    location: "Banaras, Uttar Pradesh",
    category: "Folk Tales",
    narrator: "Swami Anand",
    date: "2025-01-15",
    duration: "12:34",
    description: "...",
  },
  // ... 8 sample stories
];
```

**Key Features:**

1. **Query Parameter Handling:**

   ```javascript
   useEffect(() => {
     const params = new URLSearchParams(location.search);
     const locParam = params.get("location");
     if (locParam) {
       setSelectedLocation(locParam);
       filterStories(locParam, searchQuery, selectedCategory);
     }
   }, [location.search]);
   ```

   - Automatically filters to location from map navigation

2. **Smart Filtering:**

   ```javascript
   filterStories(loc, query, category) {
     let filtered = allStoriesData;
     if (loc) filtered = filtered.filter(s => s.location === loc);
     if (query) filtered = filtered.filter(s => matches(query));
     if (category !== "All") filtered = filtered.filter(s => s.category === category);
     setFilteredStories(filtered);
   }
   ```

3. **Dynamic Category List:**
   ```javascript
   const categories = [
     "All",
     ...new Set(allStoriesData.map((s) => s.category)),
   ];
   ```

**Responsive Grid:**

```tailwind
grid-cols-1      /* Mobile: 1 column */
md:grid-cols-2   /* Tablet: 2 columns */
lg:grid-cols-3   /* Desktop: 3 columns */
```

**Backend Integration:**

- Replace allStoriesData with: `GET /api/stories?location=...&category=...&search=...`
- Dynamic category endpoints: `GET /api/categories`

---

### Story Detail Player (`StoryDetail.jsx`)

**Data Structure:**

```javascript
{
  id: 1,
  title: "...",
  location: "...",
  category: "...",
  narrator: "...",
  date: "...",
  duration: "12:34",
  description: "...",
  fullText: "..."  // Full transcript
}
```

**Audio Player Logic:**

1. **State Management:**

   ```javascript
   const [isPlaying, setIsPlaying] = useState(false);
   const [currentTime, setCurrentTime] = useState(0);
   const [duration, setDuration] = useState(0);
   ```

2. **Event Handlers:**

   ```javascript
   onTimeUpdate → setCurrentTime(audioRef.current.currentTime)
   onLoadedMetadata → setDuration(audioRef.current.duration)
   onEnded → setIsPlaying(false)
   ```

3. **Time Formatting:**

   ```javascript
   formatTime(12.5) → "0:12"
   formatTime(125) → "2:05"
   ```

4. **Progress Scrubbing:**
   ```javascript
   <input type="range" onChange={handleProgressChange} />
   // Updates audioRef.current.currentTime
   ```

**Audio Source:**

- Currently uses sample MP3 from CDN
- Replace with actual uploaded file URL from backend

**Backend Integration:**

- Get story: `GET /api/stories/:id`
- Get audio file URL: `audioFileUrl` field in response
- Download button: `GET /api/stories/:id/download` (trigger download)

---

## Component Documentation

### Recorder Component (`Recorder.jsx`)

**Purpose:** Encapsulates all audio recording and playback logic

**Props:** None (fully self-contained)

**State:**

```javascript
isRecording; // Boolean: recording in progress
hasRecording; // Boolean: recording exists
status; // String: "Idle", "Recording", "Ready", "Processing", "Microphone denied"
progress; // Number: 0-100 for loading bar
```

**Refs:**

```javascript
waveformRef; // DOM container for WaveSurfer
wsRef; // WaveSurfer instance
mediaRecorderRef; // Browser MediaRecorder
chunksRef; // Audio chunk array
```

**Key Methods:**

1. **startRecording()**

   ```javascript
   - Requests microphone permission
   - Creates MediaRecorder
   - Sets up event listeners
   - Starts recording
   - Updates status UI
   ```

2. **stopRecording()**

   ```javascript
   - Stops MediaRecorder
   - Stops microphone tracks
   - Creates Blob from chunks
   - Loads blob into WaveSurfer
   ```

3. **togglePlay()**
   ```javascript
   - Calls wsRef.current.playPause()
   - Toggles WaveSurfer playback
   ```

**UI Elements:**

- Waveform container (WaveSurfer visualization)
- Start/Stop button (context-aware text)
- Upload File button
- Submit to Archive button
- Status indicator with dots

**WaveSurfer Configuration:**

```javascript
{
  backend: "WebAudio",      // Use Web Audio API
  height: 80,               // Waveform height
  waveColor: "#111827",     // Neutral color
  normalize: true,          // Normalize amplitude
  cursorWidth: 0            // Hide cursor
}
```

**Error Handling:**

- Catches microphone permission denied
- Updates status to "Microphone denied"
- User can retry

**Future Enhancements:**

- Export recording as file
- Backend upload with progress
- Recording duration limit
- Noise detection

---

### Navbar Component (`Navbar.jsx`)

**Purpose:** Global navigation header

**Structure:**

- Logo section (mic icon + branding)
- Navigation links

**Links:**

```javascript
/ → Home (Landing)
/record → Recording Studio
/map → Cultural Atlas
/stories → Archive
/leaders → Registry
```

**Styling:**

- `sticky top-0` - Stays at top during scroll
- `backdrop-blur-xl` - Glassmorphism effect
- `z-index: 50` (implicit from sticky)

**Responsive:**

- Logo and nav stack automatically
- Text sizes adjust at breakpoints

---

## Key Technical Decisions

### 1. **Full-Bleed Layout with Inner Constraints**

**Decision:** Use `w-full` outer containers with `max-w-auto mx-auto` inner wrappers

**Rationale:**

- Allows full-width backgrounds (like terracotta section)
- Keeps content centered and constrained to max-width
- Responsive padding scales with viewport

```jsx
<div className="w-full bg-terracotta">
  <div className="max-w-auto mx-auto px-8 py-16">
    {/* Content constrained to reasonable width */}
  </div>
</div>
```

**Alternative (rejected):** Container with max-width and auto margins

- Would not allow full-width backgrounds
- Less flexible for edge-to-edge design

---

### 2. **useRef for DOM and Library Access**

**Decision:** Use refs for WaveSurfer, Leaflet, MediaRecorder, audio elements

**Rationale:**

- These are external libraries and browser APIs
- Don't need React state tracking
- Avoid unnecessary re-renders
- Direct method calls are required

```javascript
// Correct ✅
const wsRef = useRef(null);
wsRef.current.loadBlob(blob); // Direct method call

// Would be wrong ❌
const [waveSurfer, setWaveSurfer] = useState(null);
waveSurfer.loadBlob(blob); // Triggers re-render, not ideal
```

---

### 3. **Query Parameters for Navigation State**

**Decision:** Use URL query params for location filtering from map

**Rationale:**

- Browser back button works naturally
- User can bookmark filtered view
- State is shareable (paste URL to friend)
- Cleaner than prop drilling through routes

```javascript
// Map → Stories navigation
navigate(`/stories?location=${encodeURIComponent(story.location)}`);

// Stories page reads param
const params = new URLSearchParams(location.search);
const loc = params.get("location");
```

---

### 4. **No Global State Management**

**Decision:** Use only local component state (useState)

**Rationale:**

- Project is small enough (6 pages)
- Each page has independent concerns
- Navigation passes data via URL
- Easy to add Redux/Context later if needed

**When to upgrade:**

- Add authentication (user state across pages)
- Add real-time notifications
- Complex cross-page state syncing
- Multiple pages editing same data

---

### 5. **Responsive Mobile-First Approach**

**Decision:** Base styles for mobile, then enhance with Tailwind breakpoints

**Pattern:**

```tailwind
class="p-4 sm:p-6 lg:p-8"         /* Padding scales */
class="text-sm sm:text-base lg:text-lg"  /* Text scales */
class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"  /* Grid */
```

**Rationale:**

- Mobile is 50%+ of web traffic
- Constraints of small screen force good design
- Easier to add space than remove it
- Better performance on mobile-first defaults

---

### 6. **Tailwind CSS Only (No CSS-in-JS)**

**Decision:** Pure Tailwind utility classes, no styled-components or CSS files

**Rationale:**

- Smaller bundle size
- Faster development (no context switching)
- Easy to understand design tokens
- Built-in responsive system
- Consistent spacing/colors

**Trade-off:** Some long className strings

```jsx
// Long but transparent
className =
  "w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-stone-200";
```

---

## Dependencies Explanation

| Package              | Version | Purpose                   | Used Where                          |
| -------------------- | ------- | ------------------------- | ----------------------------------- |
| react                | 18.2.0  | Component library         | Entire app                          |
| react-dom            | 18.2.0  | React DOM rendering       | main.jsx                            |
| react-router-dom     | 6.14.1  | Client-side routing       | App.jsx, all pages                  |
| wavesurfer.js        | 7.0.0   | Audio visualization       | Recorder.jsx, StoryDetail.jsx       |
| leaflet              | 1.9.4   | Map library               | MapExplorer.jsx                     |
| react-leaflet        | 4.2.1   | React wrapper for Leaflet | MapExplorer.jsx                     |
| framer-motion        | 10.12.7 | Animation library         | (Not yet used; included for future) |
| tailwindcss          | 3.4.5   | Utility CSS               | All components                      |
| postcss              | 8.4.24  | CSS processing            | Tailwind build step                 |
| autoprefixer         | 10.4.14 | Vendor prefixes           | PostCSS plugin                      |
| vite                 | 5.1.0   | Build tool                | Development & production            |
| @vitejs/plugin-react | 5.1.0   | React fast refresh        | Vite config                         |

**Why each was chosen:**

- **WaveSurfer** - Industry standard for audio visualization; clean API
- **Leaflet** - Lightweight map library with good performance
- **React Router** - Recommended by React team; powerful routing
- **Vite** - 10x faster than Create React App; excellent DX
- **Tailwind** - Modern utility-first CSS; great for prototyping

---

## Development Notes

### Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → Runs on http://localhost:5173

# Build for production
npm run build
# → Creates optimized dist/ folder

# Preview production build
npm run preview
```

### Common Issues & Solutions

**Issue: ESM Module Error**

```
"ESM file cannot be loaded by require"
```

**Solution:** Already fixed - `package.json` has `"type": "module"`

**Issue: WaveSurfer not rendering**

```javascript
// Make sure container ref is attached to DOM
<div ref={waveformRef} className="h-24" />
```

**Issue: Map not showing**

```javascript
// Make sure height is set on MapContainer
<MapContainer style={{ height: "100%", width: "100%" }}>
```

**Issue: Audio not playing**

```javascript
// Check browser allows autoplay (usually requires user interaction first)
// Make sure audio source URL is correct
```

---

## Next Steps & Future Enhancements

### Phase 1: Backend Integration (Immediate)

- [ ] Create Node/Express backend
- [ ] Set up MongoDB for stories, users, locations
- [ ] Implement API endpoints:
  ```
  POST   /api/stories           - Upload new story
  GET    /api/stories           - List with filters
  GET    /api/stories/:id       - Get single story
  GET    /api/locations         - Get all locations
  GET    /api/categories        - Get categories
  POST   /api/stories/:id/download - Download audio
  ```
- [ ] Wire form submission to backend
- [ ] Replace mock data with API calls
- [ ] Add error handling & loading states
- [ ] Implement pagination for large result sets

### Phase 2: Authentication & User Management

- [ ] User registration/login
- [ ] User profiles
- [ ] Track who recorded what
- [ ] Contributor stats
- [ ] User permissions (edit/delete own stories)

### Phase 3: Advanced Features

- [ ] Full-text search across transcripts
- [ ] Filters by year, age range, language
- [ ] Favorites/bookmarking
- [ ] Comments & ratings
- [ ] Export stories as PDF
- [ ] Share on social media
- [ ] Email notifications

### Phase 4: Performance & SEO

- [ ] Code splitting (lazy load pages)
- [ ] Image optimization
- [ ] Metadata for social sharing
- [ ] Sitemap generation
- [ ] Search engine indexing

### Phase 5: Analytics & Insights

- [ ] Track page views
- [ ] Most popular stories
- [ ] User engagement metrics
- [ ] Heat map of recorded locations
- [ ] Dashboard for admins

---

## Important Files Quick Reference

| File                          | Purpose                |
| ----------------------------- | ---------------------- |
| `src/App.jsx`                 | Routes & main layout   |
| `src/index.css`               | Tailwind global styles |
| `src/pages/Landing.jsx`       | Hero & mission         |
| `src/pages/Recording.jsx`     | Form + recorder        |
| `src/pages/MapExplorer.jsx`   | Interactive map        |
| `src/pages/Stories.jsx`       | Archive & search       |
| `src/pages/StoryDetail.jsx`   | Player & transcript    |
| `src/components/Recorder.jsx` | Audio recording logic  |
| `src/components/Navbar.jsx`   | Navigation header      |
| `package.json`                | Dependencies           |
| `tailwind.config.cjs`         | Tailwind theme         |
| `vite.config.js`              | Build configuration    |

---

## Summary for Next AI Agent

**Handoff Key Points:**

1. **Frontend is complete** - All 6 pages built with responsive design
2. **Design system ready** - Tailwind utilities, color palette, typography established
3. **Mock data in place** - 8 sample stories, 6 locations, all required fields
4. **User flows working** - Map → Stories → Player chain works perfectly
5. **No backend yet** - Next step is Node/Express API integration
6. **Tech decisions documented** - Why useRef, why Tailwind, why routing approach
7. **Responsive & accessible** - Mobile-first, proper semantic HTML
8. **Code is clean** - Well-organized components, clear naming, no tech debt

**To Continue Development:**

1. Create backend with Express/Node
2. Replace mock data arrays with API calls
3. Add form submission handling
4. Implement authentication
5. Deploy frontend + backend

**Most Important Files to Review First:**

1. `App.jsx` - Understand routing structure
2. `Recorder.jsx` - Understand useRef patterns
3. `Landing.jsx` - Understand full-bleed design
4. Sample pages to see patterns (MapExplorer, Stories)

---

**Last Commit:** Feature-complete frontend with 6 pages, 2 components, responsive design  
**Ready For:** Backend integration, user testing, deployment planning
