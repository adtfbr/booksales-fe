import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn, isAdmin } from "../_services/auth";

const ProtectedRoute = ({ children, role }) => {
  const location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (role === "admin" && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;