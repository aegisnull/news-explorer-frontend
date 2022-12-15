import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © {new Date().getFullYear()} Supersite, Powered by News API
        </p>
        <nav className="footer__nav">
          <div className="footer__link">Inicio</div>
          <div className="footer__link">Practicum</div>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
