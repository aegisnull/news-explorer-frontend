import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isAuthChecked, children }) {
  if (!isAuthChecked) {
    return null;
  }

  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
