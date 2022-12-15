import React from "react";
import Logo from "../../images/logo.svg";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src={Logo} alt="NewsExplorer Logo" />
        </div>
        <nav className="header__nav">
          <div className="header__link">Inicio</div>
          <button className="header__button">Iniciar sesión</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
