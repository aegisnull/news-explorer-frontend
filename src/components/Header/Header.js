"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../images/logo.svg";
import LightLogo from "../../images/logo_light.svg";
import MobileMenuDark from "../../images/mobile-header_dark.svg";
import MobileMenuLight from "../../images/mobile-header_light.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useAuth } from "../../contexts/AuthContext";

import "./Header.scss";

function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { isLoggedIn, letLogOut, onSignInClick } = useAuth();

  const currentPath = usePathname();
  const isSavedNews = currentPath === "/saved-news";
  const logoPath = isSavedNews && !menuOpen ? LightLogo : Logo;
  const textColor = isSavedNews ? "header__link_light" : "";
  const buttonColor =
    isSavedNews && !menuOpen ? "header__button_light" : "header__button";
  const mobileMenu =
    isSavedNews && !menuOpen ? MobileMenuDark : MobileMenuLight;
  const logOutIcon = isSavedNews ? "header__user_light" : "header__user_dark";

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__container">
        <Link href="/">
          <div className="header__logo">
            <img src={logoPath} alt="NewsExplorer Logo" />
          </div>
        </Link>

        {menuOpen ? (
          <>
            <nav className="header__nav header__nav_dropdown">
              <button
                className="header__mobile-menu"
                type="button"
                onClick={toggleMenu}
                aria-label="Cerrar menú"
              >
                <img
                  src={mobileMenu}
                  alt="Mobile Menu"
                  className="header-mobile-menu-img"
                />
              </button>
            </nav>
            <div className="dropdown">
              <Link href="/">
                <div
                  className={`header__link header__text header__link_dropdown1 `}
                >
                  Inicio
                </div>
              </Link>
              {isLoggedIn ? (
                <>
                  <Link href="/saved-news">
                    <div
                      className={`header__link header__text ${textColor} header__link_dropdown2`}
                    >
                      Artículos guardados
                    </div>
                  </Link>
                  <button
                    type="button"
                    className={`${buttonColor} header__text header__text_dropdown ${logOutIcon} `}
                    onClick={letLogOut}
                  >
                    {currentUser.name}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className={`${buttonColor} header__text header__text_dropdown `}
                  onClick={onSignInClick}
                >
                  Iniciar sesión
                </button>
              )}
            </div>
          </>
        ) : (
          <nav className="header__nav">
            <Link href="/">
              <div className={`header__link header__text ${textColor}`}>
                Inicio
              </div>
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/saved-news">
                  <div className={`header__link header__text ${textColor}`}>
                    Artículos guardados
                  </div>
                </Link>
                <button
                  type="button"
                  className={`${buttonColor} header__text ${logOutIcon}`}
                  onClick={letLogOut}
                >
                  {currentUser.name}
                </button>
                <button
                  className="header__mobile-menu"
                  type="button"
                  onClick={toggleMenu}
                  aria-label="Abrir menú"
                >
                  <img
                    src={mobileMenu}
                    alt="Mobile Menu"
                    className="header-mobile-menu-img"
                  />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={`${buttonColor} header__text `}
                  onClick={onSignInClick}
                >
                  Iniciar sesión
                </button>
                <button
                  className="header__mobile-menu"
                  type="button"
                  onClick={toggleMenu}
                  aria-label="Abrir menú"
                >
                  <img
                    src={mobileMenu}
                    alt="Mobile Menu"
                    className="header-mobile-menu-img"
                  />
                </button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
