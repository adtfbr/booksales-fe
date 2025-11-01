import { Navigate } from "react-router-dom";
// Path import diperbaiki untuk menunjuk ke folder _services
import { isLoggedIn, isAdmin } from "../_services/auth";

const GuestRoute = ({ children }) => {
  
  if (isLoggedIn()) {
    if (isAdmin()) {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default GuestRoute;