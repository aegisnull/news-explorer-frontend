import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import { Routes, Route, Navigate } from "react-router-dom";
import SignInPopup from "./components/PopupWithForm/SignInPopup";
import SignUpPopup from "./components/PopupWithForm/SignUpPopup";
import SuccessPopup from "./components/PopupWithForm/SuccessPopup";
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import {
  register,
  authenticate,
  /* validateToken, */
  getUserInfo,
} from "./utils/Auth";

function App() {
  const [isSignInPopupOpen, setSignInPopupOpen] = React.useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSignUp(userData) {
    register(userData)
      .then((user) => {
        if (user.data._id) {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
      })
      .catch(() => {
        setIsSuccess(false);
      });
  }

  function handleLogin(userData) {
    authenticate(userData)
      .then((user) => {
        if (user.token) {
          localStorage.setItem("jwt", user.token);
          setIsLoggedIn(true);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  }

  function handleSignUpClick() {
    setSignUpPopupOpen(true);
    setSignInPopupOpen(false);
  }

  function handleSuccessClick() {
    setSuccessPopupOpen(true);
    setSignUpPopupOpen(false);
    setSignInPopupOpen(false);
  }

  function handleSignInClick() {
    setSignInPopupOpen(true);
  }

  function closeAllPopups() {
    setSignInPopupOpen(false);
    setSignUpPopupOpen(false);
    setSuccessPopupOpen(false);
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <SignInPopup
          isOpen={isSignInPopupOpen}
          onClose={closeAllPopups}
          onRegister={handleSignUpClick}
        />
        <SignUpPopup
          isOpen={isSignUpPopupOpen}
          onClose={closeAllPopups}
          isRegisterOpen
          onSuccess={handleSuccessClick}
        />

        <SuccessPopup isOpen={isSuccessPopupOpen} onClose={closeAllPopups} />

        <Routes>
          <Route
            path="/"
            element={<Main onSignInClick={handleSignInClick} />}
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews onSignInClick={handleSignInClick} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
