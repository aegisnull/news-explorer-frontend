import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import NotFound from "./components/NotFound/NotFound";
import { Routes, Route } from "react-router-dom";
import SignInPopup from "./components/PopupWithForm/SignInPopup";
import React from "react";

function App() {
  return (
    <div className="App">
      <SignInPopup />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/saved-news" element={<SavedNews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
