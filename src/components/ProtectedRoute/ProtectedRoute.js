import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (isLoggedIn === true) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default ProtectedRoute;
