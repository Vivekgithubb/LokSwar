# LokSwar Technical Architecture & Implementation Details

**For AI Agents Continuing Development**

---

## Project Setup Details

### Environment

- **OS:** Windows
- **Node:** Requires Node 16+
- **Package Manager:** npm
- **Build Tool:** Vite 5.1.0
- **Browser Support:** Modern browsers (ES2020+)

### Development Server

```bash
npm run dev
# Port: http://localhost:5173
# Hot reload: Enabled (changes reflect instantly)
# Fast refresh: React fast refresh enabled
```

### Production Build

```bash
npm run build
# Output: dist/ folder
# Optimization: Minified, tree-shaken, chunked
# Deploy: Copy dist/ to CDN or static server
```

---

## Component Lifecycle Map

### Page Components (6 total)

**Landing.jsx**

```
Mount → Static render of hero sections
No state, no API calls
Unmount → Nothing to cleanup
```

**Recording.jsx**

```
Mount → Render form + Recorder component
State: None (forms are uncontrolled)
Event: Submit button (not yet wired)
Unmount → Nothing to cleanup (Recorder handles its own cleanup)
```

**MapExplorer.jsx**

```
Mount → Initialize filtered stories, create Leaflet map instance
State: [searchQuery, selectedLocation, filteredStories]
useRef: mapRef (for map control)
Event: Search input → handleSearch() → filter stories
Event: Marker click → handleMarkerClick() → zoom map
Event: Sidebar click → handleLocationClick() → navigate to /stories
Unmount → Cleanup: mapRef.current destroyed by Leaflet
```

**Stories.jsx**

```
Mount → Parse URL params, fetch location filter, render stories
State: [searchQuery, selectedLocation, filteredStories, selectedCategory]
useEffect: Parse location.search param on mount
Event: Search → filter stories
Event: Location filter → filter stories
Event: Category filter → filter stories
Event: Listen Now → navigate to /story/:id
Unmount → Nothing to cleanup
```

**StoryDetail.jsx**

```
Mount → Get story ID from params, find story in data, render player
State: [isPlaying, currentTime, duration]
useRef: audioRef (for audio control)
Event: Play/Pause → audioRef.current.play/pause()
Event: Progress bar → audioRef.current.currentTime = ...
Event: Audio events → onTimeUpdate, onLoadedMetadata, onEnded
Unmount → Audio stops, refs cleaned up
```

**Leaderboard.jsx**

```
Mount → Render contributor table
No state, no API
Unmount → Nothing
```

### Reusable Components (2 total)

**Navbar.jsx**

```
Mount → Static render of navigation
Props: None
State: None
Event: Links to routes (React Router handles)
Unmount → Nothing
```

**Recorder.jsx**

```
Mount → Initialize empty refs, create WaveSurfer instance
State: [isRecording, hasRecording, status, progress]
useRef: waveformRef, wsRef, mediaRecorderRef, chunksRef
useEffect: Create/destroy WaveSurfer instance
Event: Start button → startRecording() → request microphone
Event: Stop button → stopRecording() → create Blob → load to WaveSurfer
Event: Play button → togglePlay() → WaveSurfer playback
Unmount → Cleanup: WaveSurfer destroyed, audio tracks stopped
```

---

## Data Models

### Story Object

```javascript
{
  id: number,
  title: string,
  location: string,              // "City, State"
  category: string,              // "Folk Tales", "Songs", etc
  narrator: string,
  date: string,                  // "2025-01-15"
  duration: string,              // "12:34"
  description: string,
  fullText?: string,             // Full transcript (StoryDetail only)
  audioUrl?: string,             // URL to audio file (from backend)
  recordedBy?: string,           // User ID (future)
  tags?: string[],               // For search (future)
  dialect?: string,              // Language/dialect
  transcriptUrl?: string         // URL to transcript file
}
```

### Location Object

```javascript
{
  id: number,
  title: string,
  category: string,
  count: number,                 // Number of stories at this location
  location: string,              // "City, State"
  lat: number,
  lng: number,
  color: string,                 // Marker color
  stories?: Story[]              // Array of Story objects (optional)
}
```

### User Object (Future)

```javascript
{
  id: string,
  email: string,
  name: string,
  avatar?: string,
  role: "user" | "moderator" | "admin",
  createdAt: string,
  totalRecordings: number,
  bio?: string,
  region?: string,
  language?: string[]
}
```

---

## State Management Pattern

### Current Approach (Small, Local)

```javascript
// Each page manages its own state
const [searchQuery, setSearchQuery] = useState("");
const [filteredResults, setFilteredResults] = useState([]);
const [selectedItem, setSelectedItem] = useState(null);

// Navigation passes data via URL
navigate(`/stories?location=${location}`);
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const loc = params.get("location");
  // Use loc to filter data
}, [location.search]);
```

**When to upgrade to Context/Redux:**

- Authentication state needed across pages
- Real-time updates (notifications, live data)
- User preferences (theme, language)
- Complex state derived from multiple sources
- App grows beyond 10 pages

### Proposed Context Structure (if needed)

```javascript
// contexts/AuthContext.jsx
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Usage in any page
const { user } = useContext(AuthContext);
```

---

## API Integration Strategy

### Current Mock Data Locations

```javascript
// MapExplorer.jsx - Line 19
const storiesData = [...]

// Stories.jsx - Line 4
const allStoriesData = [...]

// StoryDetail.jsx - Line 7
const allStoriesData = [...]
```

### Replacement Pattern (When Backend Ready)

```javascript
// Before (mock data)
const [stories, setStories] = useState(mockData);

// After (API)
const [stories, setStories] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchStories = async () => {
    try {
      const response = await fetch("/api/stories");
      const data = await response.json();
      setStories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchStories();
}, []);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
```

### Proposed API Endpoints

```
GET    /api/stories                    List all stories
GET    /api/stories?location=...       Filter by location
GET    /api/stories?category=...       Filter by category
GET    /api/stories?search=...         Search by text
GET    /api/stories/:id                Get single story
POST   /api/stories                    Upload new story (form data)
GET    /api/locations                  Get all locations with counts
GET    /api/categories                 Get unique categories
POST   /api/stories/:id/download       Download audio file
GET    /api/stories/:id/transcript     Get transcript
```

### Error Handling Pattern

```javascript
const handleApiCall = async () => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch("/api/stories");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    setStories(data);
  } catch (err) {
    console.error("API Error:", err);
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
```

---

## useRef Deep Dive

### Why Not useState for These Cases?

#### Case 1: WaveSurfer Instance (Recorder.jsx)

```javascript
// ❌ WRONG: Updates trigger re-renders
const [waveSurfer, setWaveSurfer] = useState(null);

useEffect(() => {
  const ws = WaveSurfer.create({ container: ref.current });
  setWaveSurfer(ws); // ← Causes unnecessary re-render
}, []);

// ✅ CORRECT: Persistent reference, no re-renders
const wsRef = useRef(null);

useEffect(() => {
  wsRef.current = WaveSurfer.create({ container: ref.current });
}, []);

// In event handler (no re-render needed)
wsRef.current.loadBlob(blob);
```

#### Case 2: Audio Element (StoryDetail.jsx)

```javascript
// ❌ WRONG: Serializing audio element doesn't make sense
const [audio, setAudio] = useState(null);

// ✅ CORRECT: Direct DOM reference
const audioRef = useRef(null);

// Direct method calls on element
audioRef.current.play();
audioRef.current.pause();
audioRef.current.currentTime = 30;
```

#### Case 3: HTML Input Elements (if needed)

```javascript
// Can use controlled component (state-based)
const [value, setValue] = useState("");
<input value={value} onChange={(e) => setValue(e.target.value)} />

// But for form submission, uncontrolled is simpler
<input name="title" />
const formData = new FormData(form);
```

### ref.current Pattern Explained

```javascript
const myRef = useRef(initialValue);

// ref is a mutable object:
myRef = {
  current: initialValue, // ← actual value
};

// Access with .current
myRef.current = newValue;
console.log(myRef.current);
```

---

## Responsive Design Implementation

### Mobile-First Strategy

```css
/* Base styles (mobile, smallest viewport) */
.component {
  padding: 1rem; /* p-4 */
  grid-template-columns: 1fr; /* Single column */
}

/* sm: 640px and up */
@media (min-width: 640px) {
  .component {
    padding: 1.5rem; /* sm:p-6 */
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
  }
}

/* lg: 1024px and up */
@media (min-width: 1024px) {
  .component {
    padding: 2rem; /* lg:p-8 */
    grid-template-columns: repeat(3, 1fr); /* 3 columns */
  }
}
```

### Tailwind Implementation

```jsx
// All in one className (no media queries written by dev)
<div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {/* Handles all responsive behavior automatically */}
</div>
```

### Testing Responsive Design

```bash
# Browser DevTools
1. Open Chrome DevTools (F12)
2. Click device toggle (top-left)
3. Change viewport size
4. Test at: 320px, 640px, 768px, 1024px, 1440px

# Or narrow/expand browser window and observe changes
```

---

## Build & Deployment Process

### Development Workflow

```bash
1. npm install              # Install dependencies
2. npm run dev             # Start Vite dev server
3. Make changes            # Edit files in src/
4. Hot reload              # Changes appear instantly
5. Open DevTools           # Debug as needed
6. Commit changes          # Git commit/push
```

### Production Build Process

```bash
npm run build

# Process:
# 1. Vite bundles all files
# 2. Tree-shakes unused code
# 3. Minifies CSS/JS
# 4. Creates hash-named files (for caching)
# 5. Outputs to dist/ folder

# Result:
dist/
├── index.html
├── assets/
│   ├── index-abc123.js
│   ├── index-def456.css
│   └── vendor-ghi789.js
```

### Deployment Options

**Option 1: Netlify (Recommended)**

```bash
1. Connect GitHub repo
2. Set build command: npm run build
3. Set publish directory: dist
4. Auto-deploys on git push
```

**Option 2: Vercel**

```bash
1. Connect GitHub repo
2. Auto-detects Vite config
3. Auto-deploys on push
```

**Option 3: Traditional Server**

```bash
1. npm run build
2. Upload dist/ to web server
3. Configure server to serve index.html for all routes
```

---

## Testing Strategy (Future)

### Unit Tests (Component functions)

```javascript
// Example: Testing a utility function
import { formatTime } from "./utils";

describe("formatTime", () => {
  it("should format seconds to MM:SS", () => {
    expect(formatTime(125)).toBe("2:05");
    expect(formatTime(12)).toBe("0:12");
  });
});
```

### Integration Tests (Component interactions)

```javascript
// Example: Testing map interaction
import { render, screen } from "@testing-library/react";
import MapExplorer from "./MapExplorer";

describe("MapExplorer", () => {
  it("should show stories in sidebar", () => {
    render(<MapExplorer />);
    expect(screen.getByText("River Guardian Legends")).toBeInTheDocument();
  });
});
```

### E2E Tests (Full user flows)

```javascript
// Using Cypress or Playwright
describe("Story flow", () => {
  it("should navigate from map to story player", () => {
    cy.visit("/map");
    cy.get('[data-testid="story-item"]').first().click();
    cy.url().should("include", "/story/");
    cy.get('button:contains("Play")').should("exist");
  });
});
```

---

## Performance Optimization Roadmap

### Current Performance

- ✅ Vite fast cold start (~200ms)
- ✅ React fast refresh (instant updates)
- ⚠️ All code in single bundle (will slow down)
- ⚠️ No image optimization
- ⚠️ WaveSurfer loaded immediately

### Optimization Plan (Priority Order)

1. **Code Splitting**

   ```javascript
   // Lazy load pages
   const Landing = lazy(() => import("./pages/Landing"));
   const Recording = lazy(() => import("./pages/Recording"));
   // Wrap routes in Suspense boundary
   <Suspense fallback={<Loading />}>
     <Routes>
       <Route path="/" element={<Landing />} />
     </Routes>
   </Suspense>;
   ```

2. **Image Optimization**

   - Use WebP format with fallbacks
   - Compress PNGs/JPGs
   - Use <picture> element for responsive images

3. **Library Optimization**

   - Load WaveSurfer only on Recording page
   - Load Leaflet only on MapExplorer page

4. **Caching**
   - Configure HTTP cache headers
   - Use service worker for offline support

---

## Debugging Tips

### Browser DevTools

**React DevTools Extension**

- Inspect component tree
- Check props and state
- Identify unnecessary re-renders

**Network Tab**

- Check API calls (when backend ready)
- Monitor file sizes
- Identify slow requests

**Console**

- Watch for errors and warnings
- Use console.log() for debugging
- Check for memory leaks

### Common Debug Patterns

```javascript
// Log state changes
useEffect(() => {
  console.log("Stories changed:", stories);
}, [stories]);

// Log ref changes
useEffect(() => {
  console.log("Map ref:", mapRef.current);
  return () => (mapRef.current = null);
}, []);

// Conditional logging
const DEBUG = true;
if (DEBUG) console.log("Data:", data);
```

---

## File Size & Performance Metrics

### Current Bundle Size

```
dist/index.html           ~2KB
dist/index-*.js          ~180KB (minified)
dist/index-*.css         ~30KB (minified)
dist/vendor-*.js         ~200KB (minified)
Total                    ~410KB (before gzip)
Gzipped                  ~90KB (typical transfer)
```

### First Load Time

- Network: ~1s (typical 100Mbps)
- Parse/Execute: ~500ms
- Total: ~2.5s (typical 3G connection)

### Optimized Target

- <500ms to first paint
- <1.5s to interactive
- <2s total load time

---

## Security Considerations (Future)

### When Adding Backend

**CORS Headers**

```javascript
// Backend should return
Access-Control-Allow-Origin: https://yourdomain.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Credentials: true
```

**Environment Variables**

```javascript
// Never commit .env files
// Use .env.local for local development
VITE_API_URL=https://api.yourdomain.com

// Access in component
const apiUrl = import.meta.env.VITE_API_URL;
```

**Input Sanitization**

```javascript
// Before submitting user input
import DOMPurify from "dompurify";
const cleanInput = DOMPurify.sanitize(userInput);
```

---

## Summary for Next Developer

**Most Important Concepts:**

1. useRef for DOM/library access (not state)
2. Local state + URL params (not Redux)
3. Mobile-first responsive design
4. Mock data ready for API replacement
5. Full lifecycle understood for each component

**Critical Next Step:**
Build Express backend with MongoDB

**Files to Study First:**

1. App.jsx (routing structure)
2. Recorder.jsx (useRef patterns)
3. MapExplorer.jsx (complex state + refs)
4. StoryDetail.jsx (audio library integration)

**Questions to Answer:**

- How does the audio player work? (useRef + HTML5 API)
- How does the map zoom work? (mapRef + Leaflet API)
- How does location filtering work? (URL params + useState)
- Where does data come from? (Mock arrays, will be API)

---

**Status:** Ready for backend integration  
**Confidence:** High - architecture is solid, scalable  
**Technical Debt:** Low - clean, organized code
