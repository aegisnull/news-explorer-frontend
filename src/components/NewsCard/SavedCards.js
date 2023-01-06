import React from "react";
import "./NewsCard.scss";
import { NewsContext } from "../../contexts/NewsContext";
import MainApi from "../../utils/MainApi";

function SavedCards() {
  const savedNews = React.useContext(NewsContext);

  return (
    <>
      <div className="cards-container cards-container_saved">
        {savedNews.map((savedNews, index) => (
          <Card
            title={savedNews.title}
            urlToImage={savedNews.image}
            url={savedNews.link}
            publishedAt={savedNews.date}
            content={savedNews.text}
            source={savedNews.source}
            keyword={savedNews.keyword}
            id={savedNews._id}
            key={index}
          />
        ))}
      </div>
    </>
  );
}

function Card(props) {
  function showTooltip(cardElement) {
    const tooltip = cardElement.querySelector(".card__hover-text");
    tooltip.classList.toggle("card__hover-text_active");
  }

  function handleCardHover(event) {
    if (!props.isLoggedIn) {
      showTooltip(event.currentTarget);
    }
  }

  function deleteArticle() {
    const jwt = localStorage.getItem("jwt");
    MainApi.deleteArticle(jwt, props.id)
      .then(() => {
        console.log("Article deleted");
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <article
      className="card"
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardHover}
    >
      <button className="card__trash-button" onClick={deleteArticle} />
      <button className="card__keyword-button"></button>
      <div className="card__keyword-container">{props.keyword}</div>
      <button className="card__hover-text">Remove from saved</button>
      <a
        href={props.url}
        target="_blank"
        rel="noreferrer"
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
