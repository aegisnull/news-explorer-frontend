import React from "react";

function ProtectedRoute({ isLoggedIn, children }) {
  if (isLoggedIn === true) {
    return children;
  }
}

export default ProtectedRoute;
