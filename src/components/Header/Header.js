import React from "react";
import { useLocation, Link } from "react-router-dom";
import Logo from "../../images/logo.svg";
import LightLogo from "../../images/logo_light.svg";
import MobileMenuDark from "../../images/mobile-header_dark.svg";
import MobileMenuLight from "../../images/mobile-header_light.svg";

import "./Header.scss";

function Header(props) {
  const currentPath = useLocation().pathname;
  const logoPath = currentPath === "/saved-news" ? LightLogo : Logo;
  const textColor = currentPath === "/saved-news" ? "header__link_light" : "";
  const buttonColor =
    currentPath === "/saved-news" ? "header__button_light" : "header__button";
  const mobileMenu =
    currentPath === "/saved-news" ? MobileMenuDark : MobileMenuLight;

  const [menuOpen, setMenuOpen] = React.useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <header className="header">
      <div className="header__container">
        <Link to={"/"}>
          <div className="header__logo">
            <img src={logoPath} alt="NewsExplorer Logo" />
          </div>
        </Link>

        {menuOpen ? (
          <>
            <nav className="header__nav header__nav_dropdown">
              <button className="header__mobile-menu" onClick={toggleMenu}>
                <img
                  src={mobileMenu}
                  alt="Mobile Menu"
                  className="header-mobile-menu-img"
                />
              </button>
            </nav>
            <div className="dropdown">
              <Link to={"/"}>
                <div
                  className={`header__link header__text header__link_dropdown ${textColor}`}
                >
                  Inicio
                </div>
              </Link>
              <button
                className={`${buttonColor} header__text header__text_dropdown `}
                onClick={props.onSignInClick}
              >
                Iniciar sesión
              </button>
            </div>
          </>
        ) : (
          <nav className="header__nav">
            <Link to={"/"}>
              <div className={`header__link header__text ${textColor}`}>
                Inicio
              </div>
            </Link>
            <button
              className={`${buttonColor} header__text `}
              onClick={props.onSignInClick}
            >
              Iniciar sesión
            </button>
            <button className="header__mobile-menu" onClick={toggleMenu}>
              <img
                src={mobileMenu}
                alt="Mobile Menu"
                className="header-mobile-menu-img"
              />
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
