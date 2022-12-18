import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/saved-news" element={<SavedNews />} />
      </Routes>
    </div>
  );
}

export default App;
