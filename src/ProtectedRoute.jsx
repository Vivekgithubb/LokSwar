import { Navigate } from "react-router-dom";
import { useAuth } from "./api/useAuth";

export default function ProtectedRoute({ children }) {
  const { data: user, isLoading, isError } = useAuth(); // replace with real auth logic

  if (isLoading) {
    return <div>Checking authentication...</div>;
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
