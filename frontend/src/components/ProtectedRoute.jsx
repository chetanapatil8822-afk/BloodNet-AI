import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const role = localStorage.getItem("role");

  // ❌ Not logged in
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Wrong role (for admin route)
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return children;
}

export default ProtectedRoute;