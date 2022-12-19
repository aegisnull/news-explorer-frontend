import React from "react";
import { useLocation, Link } from "react-router-dom";
import Logo from "../../images/logo.svg";
import LightLogo from "../../images/logo_light.svg";

import "./Header.scss";

function Header() {
  const currentPath = useLocation().pathname;
  const logoPath = currentPath === "/saved-news" ? LightLogo : Logo;
  const textColor = currentPath === "/saved-news" ? "header__link_light" : "";
  const buttonColor =
    currentPath === "/saved-news" ? "header__button_light" : "header__button";

  return (
    <header className="header">
      <div className="header__container">
        <Link to={"/"}>
          <div className="header__logo">
            <img src={logoPath} alt="NewsExplorer Logo" />
          </div>
        </Link>
        <nav className="header__nav">
          <Link to={"/"}>
            <div className={`header__link header__text ${textColor}`}>
              Inicio
            </div>
          </Link>
          <button className={`${buttonColor} header__text `}>
            Iniciar sesión
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
