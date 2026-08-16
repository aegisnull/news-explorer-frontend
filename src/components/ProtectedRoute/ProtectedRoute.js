"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn, isAuthChecked } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecked && !isLoggedIn) {
      router.replace("/");
    }
  }, [isAuthChecked, isLoggedIn, router]);

  if (!isAuthChecked || !isLoggedIn) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
