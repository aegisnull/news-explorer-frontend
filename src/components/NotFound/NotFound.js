import React from "react";
import "./NotFound.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function NotFound() {
  return (
    <>
      <Header />
      <div className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Página no encontrada</p>

        <a href="/" className="not-found__link">
          Volver a la página principal
        </a>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
