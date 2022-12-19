import React from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../images/logo.svg";
import LightLogo from "../../images/logo_light.svg";

import "./Header.scss";

function Header() {
  const currentPath = useLocation().pathname;
  const logoPath = currentPath === "/saved-news" ? LightLogo : Logo;

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src={logoPath} alt="NewsExplorer Logo" />
        </div>
        <nav className="header__nav">
          <div className="header__link header__text">Inicio</div>
          <button className="header__button header__text">
            Iniciar sesión
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
