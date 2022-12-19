import React from "react";
import "./SavedNewsHeader.scss";

function SavedNewsHeader() {
  const Cards = document.querySelectorAll(".card");

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <h2 className="saved-news-header__title">Artículos guardados</h2>
        <p className="saved-news-header__subtitle">
          Elise, tienes {Cards.length} artículos guardados
        </p>
        <p className="saved-news-header__keywords">
          Palabras clave:{" "}
          <span className="saved-news-header__keywords_bold">
            Naturaleza, Yellowstone, y 2 más
          </span>
        </p>
      </div>
    </section>
  );
}

export default SavedNewsHeader;
