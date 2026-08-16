import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
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
            <Link to="/" className="footer__link">
              Inicio
            </Link>
            <a
              className="footer__link"
              href="https://practicum.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Practicum
            </a>
          </div>
          <div className="footer__socials">
            <a
              href="https://github.com/aegisnull"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="footer__social"
                src={GithubLogo}
                alt="Github Logo"
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="footer__social"
                src={FacebookLogo}
                alt="Facebook Logo"
              />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
