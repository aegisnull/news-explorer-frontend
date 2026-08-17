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
import "./App.css";

function App() {
  const [isSignInPopupOpen, setSignInPopupOpen] = React.useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAuthChecked, setIsAuthChecked] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [authError, setAuthError] = React.useState("");

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setIsAuthChecked(true);
      return;
    }

    MainApi.validateToken(jwt)
      .then((res) => {
        if (res) {
          setCurrentUser(res);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser({});
      })
      .finally(() => {
        setIsAuthChecked(true);
      });
  }, []);

  function handleSignUp(email, password, name) {
    MainApi.signUp(email, password, name)
      .then((user) => {
        setIsSuccess(Boolean(user && user._id));
      })
      .catch(() => {
        setIsSuccess(false);
      })
      .finally(() => {
        setSignUpPopupOpen(false);
        setSuccessPopupOpen(true);
      });
  }

  function handleLogin(email, password) {
    setAuthError("");
    MainApi.signIn(email, password)
      .then((res) => MainApi.validateToken(res.token))
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeAllPopups();
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setAuthError(err.message || "No se pudo iniciar sesión");
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    closeAllPopups();
  }

  function handleSignUpClick() {
    setAuthError("");
    setSignUpPopupOpen(true);
    setSignInPopupOpen(false);
    setSuccessPopupOpen(false);
  }

  function handleSignInClick() {
    setAuthError("");
    setSignInPopupOpen(true);
    setSignUpPopupOpen(false);
    setSuccessPopupOpen(false);
  }

  const closeAllPopups = React.useCallback(() => {
    setSignInPopupOpen(false);
    setSignUpPopupOpen(false);
    setSuccessPopupOpen(false);
    setAuthError("");
  }, []);

  React.useEffect(() => {
    const isAnyPopupOpen =
      isSignInPopupOpen || isSignUpPopupOpen || isSuccessPopupOpen;

    if (!isAnyPopupOpen) {
      return undefined;
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

    document.addEventListener("keydown", closeByEsc);
    document.addEventListener("click", closeByOverlay);
    return () => {
      document.removeEventListener("keydown", closeByEsc);
      document.removeEventListener("click", closeByOverlay);
    };
  }, [isSignInPopupOpen, isSignUpPopupOpen, isSuccessPopupOpen, closeAllPopups]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <SignInPopup
          isOpen={isSignInPopupOpen}
          onClose={closeAllPopups}
          onRegister={handleSignUpClick}
          onSubmit={handleLogin}
          error={authError}
        />
        <SignUpPopup
          isOpen={isSignUpPopupOpen}
          onClose={closeAllPopups}
          isRegisterOpen
          onSignIn={handleSignInClick}
          onSubmit={handleSignUp}
        />

        <SuccessPopup
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          openSignIn={handleSignInClick}
          openSignUp={handleSignUpClick}
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
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isAuthChecked={isAuthChecked}
              >
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
