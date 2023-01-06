import React from "react";
import { NewsContext } from "../../contexts/NewsContext";
import "./NewsCard.scss";
import NoResults from "../NoResults/NoResults";
import MainApi from "../../utils/MainApi";

function NewsCard(props) {
  const news = React.useContext(NewsContext);
  const [cardsDisplayed, setCardsDisplayed] = React.useState(3);

  function handleViewMoreClick() {
    setCardsDisplayed(cardsDisplayed + 3);
  }

  if (news.length === 0) {
    return <NoResults />;
  }

  return (
    <>
      <h1 className="cards-section-title">Resultados de la búsqueda</h1>
      <div className="cards-container">
        {news.slice(0, cardsDisplayed).map((news, index) => (
          <Card
            title={news.title}
            urlToImage={news.urlToImage}
            url={news.url}
            publishedAt={news.publishedAt}
            content={news.content}
            source={news.source.name}
            keyword={news.keyword}
            key={index}
            isLoggedIn={props.isLoggedIn}
          />
        ))}
        <div className="cards-container__view-more-container">
          <button
            className="cards-container__view-more"
            onClick={handleViewMoreClick}
          >
            Ver más
          </button>
        </div>
      </div>
    </>
  );
}

function Card(props) {
  const cardRef = React.useRef(null);
  const [isSaved, setIsSaved] = React.useState(false);

  const cardSaveButtonClassName = `card__save-button ${
    isSaved ? "card__save-button_saved" : ""
  } `;

  function handleSaveClick() {
    const jwt = localStorage.getItem("jwt");
    // on click toggle the isSaved state
    setIsSaved(!isSaved);

    // If the card is not saved, save it to the saved articles
    if (!isSaved) {
      // Check if there is an article with the same title in the database
      MainApi.compareArticles(jwt, props.title)
        .then((res) => {
          if (res.message === "Article not found") {
            MainApi.saveArticle(jwt, {
              keyword: props.keyword,
              title: props.title,
              text: props.content,
              date: props.publishedAt,
              source: props.source,
              link: props.url,
              image: props.urlToImage,
            })
              .then(() => {
                console.log("Article saved");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // If the card is saved, delete it from the saved articles
      MainApi.deleteArticle(jwt, props.id)
        .then(() => {
          console.log("Article deleted");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function showTooltip(cardElement) {
    const tooltip = cardElement.querySelector(".card__hover-text");
    tooltip.classList.toggle("card__hover-text_active");
  }

  function handleCardHover(event) {
    if (!props.isLoggedIn) {
      showTooltip(event.currentTarget);
    }
  }

  return (
    <article
      className="card"
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardHover}
      ref={cardRef}
    >
      <button className={cardSaveButtonClassName} onClick={handleSaveClick} />
      <button className="card__keyword-button">{props.keyword}</button>
      {props.isLoggedIn ? (
        <></>
      ) : (
        <button className="card__hover-text">
          Inicia sesión para guardar artículos
        </button>
      )}
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
export default NewsCard;
