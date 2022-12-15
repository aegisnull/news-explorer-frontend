import React from "react";
import Logo from "../../images/logo.svg";

function Header() {
  return (
    <header>
      <div className="header__logo">
        <img src={Logo} alt="NewsExplorer Logo" />
      </div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">Inicio</li>
        </ul>
      </nav>
    </header>
  );
}
