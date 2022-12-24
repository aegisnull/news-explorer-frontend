import React from "react";
import "./NewsCard.scss";
import { NewsContext } from "../../contexts/NewsContext";

function NewsCard() {
  const Cards = document.querySelectorAll(".card");
  const news = React.useContext(NewsContext);

  return (
    <>
      <h1 className="cards-section-title">Resultados de la búsqueda</h1>
      <div className="cards-container">
        {news.map((news, index) => {
          return (
            <Card
              title={news.title}
              urlToImage={news.urlToImage}
              url={news.url}
              publishedAt={news.publishedAt}
              content={news.content}
              source={news.source.name}
              key={index}
            />
          );
        })}

        {Cards.length >= 3 ? (
          <button className="cards-container__view-more">Ver más</button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

function Card(props) {
  return (
    <article className="card">
      <button className="card__save-button" />
      <button className="card__keyword-button"></button>
      <button className="card__hover-text">
        Inicia sesión para guardar artículos
      </button>
      <a
        href={props.url}
        target="_blank"
        rel="noreferrer"
        className="card__link"
      >
        <img className="card__image" src={props.urlToImage} alt={props.title} />
        <div className="card__container">
          <p className="card__date">{props.publishedAt}</p>
          <h3 className="card__title">{props.title}</h3>
          <p className="card__text">{props.content}</p>
          <p className="card__publisher">{props.source}</p>
        </div>
      </a>
    </article>
  );
}
export default NewsCard;
