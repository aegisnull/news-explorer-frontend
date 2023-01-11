import React from "react";
import "./SavedNewsHeader.scss";
import { NewsContext } from "../../contexts/NewsContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedNewsHeader() {
  const savedNews = React.useContext(NewsContext);
  const currentUser = React.useContext(CurrentUserContext);

  const allKeywords = [
    ...new Set(savedNews.map((savedNews) => savedNews.keyword)),
  ];
  const displayKeywords = allKeywords.slice(0, 2);
  const remainingKeywords = allKeywords.length - displayKeywords.length;
  const keywordsString =
    displayKeywords.join(", ") +
    (remainingKeywords > 0 ? `, y ${remainingKeywords} más` : "");

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <h2 className="saved-news-header__title">Artículos guardados</h2>
        <p className="saved-news-header__subtitle">
          {currentUser.name}, tienes {savedNews.length} artículos guardados
        </p>
        <p className="saved-news-header__keywords">
          Palabras clave:{" "}
          <span className="saved-news-header__keywords_bold">
            {keywordsString}
          </span>
        </p>
      </div>
    </section>
  );
}

export default SavedNewsHeader;
