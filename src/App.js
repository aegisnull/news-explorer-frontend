import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import NotFound from "./components/NotFound/NotFound";
import { Routes, Route } from "react-router-dom";
import SignInPopup from "./components/PopupWithForm/SignInPopup";
import SignUpPopup from "./components/PopupWithForm/SignUpPopup";
import React from "react";

function App() {
  const [isSignInPopupOpen, setSignInPopupOpen] = React.useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = React.useState(false);

  function handleSignUpClick() {
    setSignUpPopupOpen(true);
    setSignInPopupOpen(false);
  }

  function handleSignInClick() {
    setSignInPopupOpen(true);
  }

  function closeAllPopups() {
    setSignInPopupOpen(false);
    setSignUpPopupOpen(false);
  }

  function closeByEsc(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  function closeByOverlay(evt) {
    if (evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", closeByEsc);
    document.addEventListener("click", closeByOverlay);
    return () => {
      document.removeEventListener("keydown", closeByEsc);
      document.removeEventListener("click", closeByOverlay);
    };
  });

  return (
    <div className="App">
      <SignInPopup
        isOpen={isSignInPopupOpen}
        onClose={closeAllPopups}
        onRegister={handleSignUpClick}
      />
      <SignUpPopup isOpen={isSignUpPopupOpen} onClose={closeAllPopups} />

      <Routes>
        <Route path="/" element={<Main onSignInClick={handleSignInClick} />} />
        <Route path="/saved-news" element={<SavedNews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
