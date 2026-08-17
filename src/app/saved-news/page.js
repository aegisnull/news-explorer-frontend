import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import SavedNews from "../../components/SavedNews/SavedNews";

export default function SavedNewsPage() {
  return (
    <ProtectedRoute>
      <SavedNews />
    </ProtectedRoute>
  );
}
