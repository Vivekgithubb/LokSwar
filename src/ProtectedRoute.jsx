import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = true; // replace with real auth logic

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
