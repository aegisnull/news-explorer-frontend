import React from "react";
import "./Footer.scss";
import GithubLogo from "../../images/github__logo.svg";
import FacebookLogo from "../../images/facebook__logo.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © {new Date().getFullYear()} Supersite, Powered by News API
        </p>
        <nav className="footer__nav">
          <div className="footer__links">
            <div className="footer__link">Inicio</div>
            <div className="footer__link">Practicum</div>
          </div>
          <div className="footer__socials">
            <img
              className="footer__social"
              src={GithubLogo}
              alt="Github Logo"
            />
            <img
              className="footer__social"
              src={FacebookLogo}
              alt="Facebook Logo"
            />
          </div>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
