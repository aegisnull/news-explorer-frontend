import React from "react";
import "./NewsCard.scss";
import { NewsContext } from "../../contexts/NewsContext";
import MainApi from "../../utils/MainApi";

function SavedCards({ onDeleteArticle }) {
  const savedNews = React.useContext(NewsContext);

  if (!Array.isArray(savedNews) || savedNews.length === 0) {
    return null;
  }

  return (
    <div className="cards-container cards-container_saved">
      {savedNews.map((article) => (
        <Card
          title={article.title}
          urlToImage={article.image}
          url={article.link}
          publishedAt={article.date}
          content={article.text}
          source={article.source}
          keyword={article.keyword}
          id={article._id}
          key={article._id || article.link}
          onDeleteArticle={onDeleteArticle}
        />
      ))}
    </div>
  );
}

function Card(props) {
  function showTooltip(cardElement) {
    const tooltip = cardElement.querySelector(".card__hover-text");
    if (tooltip) {
      tooltip.classList.toggle("card__hover-text_active");
    }
  }

  function handleCardHover(event) {
    showTooltip(event.currentTarget);
  }

  function deleteArticle() {
    if (props.onDeleteArticle) {
      props.onDeleteArticle(props.id);
      return;
    }

    const jwt = localStorage.getItem("jwt");
    MainApi.deleteArticle(jwt, props.id).catch((err) => {
      console.error(err);
    });
  }

  return (
    <article
      className="card"
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardHover}
    >
      <button
        type="button"
        className="card__trash-button"
        onClick={deleteArticle}
        aria-label="Eliminar artículo"
      />
      <div className="card__keyword-container">{props.keyword}</div>
      <button type="button" className="card__hover-text">
        Eliminar de guardados
      </button>
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card__link"
      >
        <img className="card__image" src={props.urlToImage} alt={props.title} />
        <div className="card__container">
          <p className="card__date">
            {new Date(props.publishedAt).toLocaleDateString("es-MX", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <h3 className="card__title">{props.title}</h3>
          <p className="card__text">{props.content}</p>
          <p className="card__publisher">{props.source}</p>
        </div>
      </a>
    </article>
  );
}

export default SavedCards;
