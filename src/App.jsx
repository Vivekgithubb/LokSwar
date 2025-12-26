import React from "react";
import { Routes, Route, Link, BrowserRouter, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Recording from "./pages/Recording";
import MapExplorer from "./pages/MapExplorer";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import Leaderboard from "./pages/Leaderboard";
import AiTranslating from "./pages/AiTranslating";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import AppLayout from "./AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Landing />} />
          <Route path="/record" element={<Recording />} />
          <Route path="/map" element={<MapExplorer />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/story/:id" element={<StoryDetail />} />
          <Route path="/leaders" element={<Leaderboard />} />
          <Route path="/translate" element={<AiTranslating />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
