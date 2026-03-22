import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// wraps any route that requires authentication
// saves the attempted URL so we can redirect back after login
function ProtectedRoute({ children, allowedRoles }) {
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // optional role-based guard — pass allowedRoles={["admin"]} to restrict
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
