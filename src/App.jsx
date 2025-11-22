import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Recording from "./pages/Recording";
import MapExplorer from "./pages/MapExplorer";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/record" element={<Recording />} />
          <Route path="/map" element={<MapExplorer />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/story/:id" element={<StoryDetail />} />
          <Route path="/leaders" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}
