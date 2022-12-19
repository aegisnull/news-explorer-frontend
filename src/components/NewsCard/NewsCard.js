import React from "react";
import "./NewsCard.scss";
import initialNews from "../../utils/placeholderNews";

function NewsCard() {
  return (
    <>
      <h1 className="cards-section-title">Resultados de la búsqueda</h1>
      <div className="cards-container">
        {initialNews.map((news) => {
          return <Card />;
        })}
      </div>
    </>
  );
}

function Card() {
  return (
    <article className="card">
      <button className="card__save-button" />
      <button className="card__trash-button" />
      <button className="card__keyword-button"></button>
      <button className="card__hover-text">
        Inicia sesión para guardar artículos
      </button>

      <a
        href="https://www.bbc.com/news/world-asia-64001554"
        target="_blank"
        rel="noreferrer"
        className="card__link"
      >
        <img
          className="card__image"
          src="https://ichef.bbci.co.uk/news/1024/branded_news/0E62/production/_128028630_081078748-2.jpg"
          alt="Japan"
        />
        <div className="card__container">
          <p className="card__date">December 15, 2022</p>
          <h3 className="card__title">
            Japan defence: China threat prompts plan to double military spending
          </h3>
          <p className="card__text">
            It is the most dramatic change to Japan's security strategy since
            adopting a pacifist constitution.
          </p>
          <p className="card__publisher">BBC News</p>
        </div>
      </a>
    </article>
  );
}
export default NewsCard;
