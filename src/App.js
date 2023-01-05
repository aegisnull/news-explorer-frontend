import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import { Routes, Route, Navigate } from "react-router-dom";
import SignInPopup from "./components/PopupWithForm/SignInPopup";
import SignUpPopup from "./components/PopupWithForm/SignUpPopup";
import SuccessPopup from "./components/PopupWithForm/SuccessPopup";
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import MainApi from "./utils/MainApi";

function App() {
  const [isSignInPopupOpen, setSignInPopupOpen] = React.useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      MainApi.validateToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function handleSignUp(email, password, name) {
    MainApi.signUp(email, password, name)
      .then((user) => {
        if (user._id) {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
      })
      .catch(() => {
        setIsSuccess(false);
      })
      .finally(() => {
        setSuccessPopupOpen(true);
      });
  }

  function handleLogin(email, password) {
    MainApi.signIn(email, password)
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
        closeAllPopups();
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    closeAllPopups();
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
          onSubmit={handleLogin}
        />
        <SignUpPopup
          isOpen={isSignUpPopupOpen}
          onClose={closeAllPopups}
          isRegisterOpen
          onSuccess={handleSuccessClick}
          onSubmit={handleSignUp}
        />

        <SuccessPopup
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          openSignIn={setSignInPopupOpen}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                onSignInClick={handleSignInClick}
                isLoggedIn={isLoggedIn}
                letLogOut={handleLogout}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews
                  onSignInClick={handleSignInClick}
                  isLoggedIn={isLoggedIn}
                  letLogOut={handleLogout}
                />
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
