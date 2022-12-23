import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import NotFound from "./components/NotFound/NotFound";
import { Routes, Route } from "react-router-dom";
import SignInPopup from "./components/PopupWithForm/SignInPopup";
import React from "react";

function App() {
  const [isSignInPopupOpen, setSignInPopupOpen] = React.useState(false);

  function handleSignInClick() {
    setSignInPopupOpen(true);
  }

  function closeAllPopups() {
    setSignInPopupOpen(false);
  }

  return (
    <div className="App">
      <SignInPopup isOpen={isSignInPopupOpen} onClose={closeAllPopups} />

      <Routes>
        <Route path="/" element={<Main onSignInClick={handleSignInClick} />} />
        <Route path="/saved-news" element={<SavedNews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
