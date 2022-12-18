import Main from "./components/Main/Main";
import SavedNewsHeader from "./components/SavedNewsHeader/SavedNewsHeader";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/saved-news" element={<SavedNewsHeader />} />
      </Routes>
    </div>
  );
}

export default App;
