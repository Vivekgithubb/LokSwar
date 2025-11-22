# LokSwar - Quick Reference Guide

**For AI Agents & New Developers**

---

## 30-Second Project Summary

**LokSwar** is a React + Vite frontend for preserving India's oral traditions. Users can record stories, view them on an interactive map, search an archive, and listen to audio with full details. **No backend yet** - all data is mocked in components.

---

## Key Routes

```
/                 → Landing (hero, mission, metrics)
/record           → Recording form + audio recorder
/map              → Interactive Leaflet map with search
/stories          → Archive with filters & cards
/story/:id        → Story player with full info
/leaders          → Contributor registry
```

---

## File Structure at a Glance

```
src/
├── App.jsx                 ← Routes here
├── pages/
│   ├── Landing.jsx         ← Hero page
│   ├── Recording.jsx       ← Form + Recorder component
│   ├── MapExplorer.jsx     ← Map with sidebar
│   ├── Stories.jsx         ← Archive grid + filters
│   ├── StoryDetail.jsx     ← Audio player
│   └── Leaderboard.jsx     ← Contributors table
├── components/
│   ├── Navbar.jsx          ← Navigation header
│   └── Recorder.jsx        ← Audio recording logic (useRef heavy)
└── index.css               ← Tailwind imports
```

---

## Core Concepts

### 1. useRef Usage (3 places)

```javascript
// Recorder.jsx
waveformRef; // Container for WaveSurfer (DOM element)
wsRef; // WaveSurfer instance (library object)
mediaRecorderRef; // Browser MediaRecorder API
chunksRef; // Audio data array

// StoryDetail.jsx
audioRef; // HTML <audio> element

// MapExplorer.jsx
mapRef; // Leaflet map instance
```

**Rule:** Use useRef for DOM elements, library instances, and browser APIs. They don't trigger re-renders.

### 2. State Management

- **Local state only** (useState) per component
- **No Redux/Context** (small project)
- **Navigation state** passed via URL query params

### 3. Data Flow

```
Landing page (static)
    ↓
Recording page (form + recorder, no submission yet)
    ↓
Map page (6 locations with search)
    ↓ Click sidebar → /stories?location=...
Stories page (filters by location automatically)
    ↓ Click "Listen Now"
Story Detail page (audio player)
```

### 4. Responsive Design

```
Mobile (default)  → Full width, stacked layout
sm: (640px)      → Small changes, 2-column grids
md: (768px)      → Medium layout shifts
lg: (1024px)     → Desktop layout, side-by-side columns
```

---

## Quick Edits Cheat Sheet

### Change Hero Text

**File:** `src/pages/Landing.jsx` (lines 45-60)

```jsx
<h1>
  The Disappearing Voice
  <br />
  <span className="text-terracotta">CHANGE THIS TEXT</span>
</h1>
```

### Change Colors

**File:** `tailwind.config.cjs`

```js
theme: {
  extend: {
    colors: {
      terracotta: '#FF6B35',  // Change hex here
    }
  }
}
```

### Add New Route

**File:** `src/App.jsx`

```jsx
<Route path="/new-page" element={<NewPage />} />
```

### Add Navbar Link

**File:** `src/components/Navbar.jsx`

```jsx
<Link to="/new-page" className="hover:underline">
  New Page
</Link>
```

### Change Story Data

**Files:**

- `src/pages/MapExplorer.jsx` (storiesData array)
- `src/pages/Stories.jsx` (allStoriesData array)
- `src/pages/StoryDetail.jsx` (allStoriesData array)

Replace mock objects with API calls when backend is ready.

---

## Common Code Patterns

### Form Input (Uncontrolled)

```jsx
<input
  name="location"
  placeholder="..."
  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-sm"
/>
```

### Responsive Grid

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

### Full-Bleed Section

```jsx
<section className="w-full bg-terracotta">
  <div className="max-w-auto mx-auto px-8 py-16">
    {/* Content automatically centered */}
  </div>
</section>
```

### useRef for Library Integration

```jsx
const instanceRef = useRef(null);

useEffect(() => {
  instanceRef.current = LibraryName.create({
    container: containerRef.current,
    options: {...}
  });
  return () => instanceRef.current.destroy();
}, []);
```

---

## What's Mocked (No Backend Yet)

- Story data (8 hardcoded stories)
- Location data (6 markers on map)
- Audio playback (sample MP3 from CDN)
- Form submission (no API call)
- User authentication (not implemented)
- File upload (not implemented)

---

## Next Developer: Start Here

1. **Read:** This file + PROJECT_DOCUMENTATION.md
2. **Run:** `npm install && npm run dev`
3. **Browse:** http://localhost:5173
4. **Click:** Map → Sidebar story → Stories archive → Listen Now
5. **Edit:** `src/pages/Landing.jsx` to understand structure
6. **Find:** `useRef` in Recorder.jsx to understand pattern
7. **Start:** Backend API endpoints (most critical next step)

---

## Common Tasks

### Task: Change primary color

1. Open `tailwind.config.cjs`
2. Change `terracotta: '#FF6B35'` to new color
3. Update `index.html` font-color if needed
4. Test by viewing pages

### Task: Add new story

1. Add object to `allStoriesData` in Stories.jsx
2. Add to `storiesData` in MapExplorer.jsx
3. Add `fullText` field to StoryDetail.jsx data
4. Test by navigating to Stories page

### Task: Change responsive breakpoints

1. All breakpoints use Tailwind defaults (sm, md, lg, etc)
2. Edit `tailwind.config.cjs` to change breakpoint pixels
3. Update component classes if needed

### Task: Add API integration

1. Create `src/services/api.js`
2. Use `fetch()` or `axios` for HTTP calls
3. Replace mock data arrays with API calls in components
4. Add error handling and loading states
5. Use `.env` file for API base URL

---

## Architecture Decisions Explained

| Decision                   | Reason                                           |
| -------------------------- | ------------------------------------------------ |
| Vite over Create React App | 10x faster builds, better DX                     |
| Tailwind (no CSS files)    | Smaller bundle, consistent design system         |
| React Router (no Next.js)  | Fine control, simpler for landing page           |
| Local state (no Redux)     | Project is small enough; add if grows            |
| useRef for libraries       | Direct API calls without re-renders              |
| Full-bleed layout          | Allows full-width backgrounds + centered content |
| Mock data                  | Backend not ready; easy to swap with API         |
| Query params for filters   | URL-shareable, browser back button works         |

---

## Useful Commands

```bash
npm run dev          # Start dev server on :5173
npm run build        # Create optimized dist/ folder
npm run preview      # Preview production build locally

# Common Vite issues
# Clear cache: rm -r node_modules/.vite
# Clear build: rm -r dist/
# Reinstall: npm install
```

---

## Backend Integration Checklist

When adding backend:

- [ ] Create Node/Express server
- [ ] Set up MongoDB collections (stories, users, locations)
- [ ] Create API endpoints (see PROJECT_DOCUMENTATION.md)
- [ ] Replace mock data arrays with fetch() calls
- [ ] Add loading/error states to pages
- [ ] Implement file upload for audio
- [ ] Add authentication (JWT tokens)
- [ ] Deploy backend (Heroku, Railway, etc)
- [ ] Update API base URL in .env
- [ ] Test all workflows end-to-end

---

## Design System Quick Ref

**Colors:**

- Primary text: `text-neutral-900` (#171717)
- Secondary text: `text-neutral-600` (#525252)
- Accent: `text-terracotta` or `bg-terracotta` (#FF6B35)
- Borders: `border-stone-200` (#e7e5e4)
- Light bg: `bg-stone-50` (#fafaf8)

**Spacing:** `p-4 sm:p-6 lg:p-8` (4px mobile, 6px tablet, 8px desktop)

**Fonts:** Inter (body), Space Grotesk (logo), Courier (data)

**Borders:** `border border-stone-200` (consistent across all containers)

---

## Troubleshooting

**Map not showing?**
→ Check MapContainer has `style={{ height: "100%", width: "100%" }}`

**Audio not playing?**
→ Check browser allows autoplay; must interact with page first

**Waveform blank?**
→ Check WaveSurfer container ref is attached to DOM node

**Filters not working?**
→ Check `allStoriesData` matches filtering logic

**Mobile layout broken?**
→ Check responsive classes use `sm:`, `md:`, `lg:` prefixes

---

## Contact Points for Next Agent

**Most Critical Understanding Needed:**

1. How useRef works (Recorder.jsx - 4 refs managing audio recording)
2. How navigation flows (Map → Stories → Detail)
3. Full-bleed layout pattern (Landing page)
4. Mock data locations (3 files with story arrays)

**Most Critical Next Step:**

1. Create Express backend
2. Create MongoDB schema
3. Wire form submission
4. Replace mock arrays with API calls

**Project Status:**

- ✅ Frontend 100% complete
- ✅ Responsive design 100%
- ✅ All 6 pages working
- ✅ Navigation flows working
- ✅ Audio player working
- ❌ Backend 0% (next focus)
- ❌ Authentication 0%
- ❌ File upload 0%

---

**Last Updated:** November 22, 2025  
**Status:** Ready for handoff to next AI agent  
**Ready for:** Backend integration sprint
