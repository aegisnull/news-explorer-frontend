"use client";

import React from "react";
import SignInPopup from "../PopupWithForm/SignInPopup";
import SignUpPopup from "../PopupWithForm/SignUpPopup";
import SuccessPopup from "../PopupWithForm/SuccessPopup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AuthContext } from "../../contexts/AuthContext";
import MainApi from "../../utils/MainApi";

function AuthProvider({ children }) {
  const [isSignInPopupOpen, setSignInPopupOpen] = React.useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAuthChecked, setIsAuthChecked] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [authError, setAuthError] = React.useState("");

  React.useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        if (!cancelled) {
          setIsAuthChecked(true);
        }
        return;
      }

      try {
        const res = await MainApi.validateToken(jwt);
        if (!cancelled && res) {
          setCurrentUser(res);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("jwt");
        if (!cancelled) {
          setIsLoggedIn(false);
          setCurrentUser({});
        }
      } finally {
        if (!cancelled) {
          setIsAuthChecked(true);
        }
      }
    }

    restoreSession();
    return () => {
      cancelled = true;
    };
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

  function closeAllPopups() {
    setSignInPopupOpen(false);
    setSignUpPopupOpen(false);
    setSuccessPopupOpen(false);
    setAuthError("");
  }

  React.useEffect(() => {
    const isAnyPopupOpen =
      isSignInPopupOpen || isSignUpPopupOpen || isSuccessPopupOpen;

    if (!isAnyPopupOpen) {
      return undefined;
    }

    function closeByEsc(evt) {
      if (evt.key === "Escape") {
        setSignInPopupOpen(false);
        setSignUpPopupOpen(false);
        setSuccessPopupOpen(false);
        setAuthError("");
      }
    }

    function closeByOverlay(evt) {
      if (evt.target.classList.contains("popup")) {
        setSignInPopupOpen(false);
        setSignUpPopupOpen(false);
        setSuccessPopupOpen(false);
        setAuthError("");
      }
    }

    document.addEventListener("keydown", closeByEsc);
    document.addEventListener("click", closeByOverlay);
    return () => {
      document.removeEventListener("keydown", closeByEsc);
      document.removeEventListener("click", closeByOverlay);
    };
  }, [isSignInPopupOpen, isSignUpPopupOpen, isSuccessPopupOpen]);

  const authValue = {
    isLoggedIn,
    isAuthChecked,
    currentUser,
    onSignInClick: handleSignInClick,
    letLogOut: handleLogout,
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AuthContext.Provider value={authValue}>
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
          {children}
        </div>
      </AuthContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default AuthProvider;
