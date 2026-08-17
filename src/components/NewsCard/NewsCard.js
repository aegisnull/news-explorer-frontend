import React from "react";
import { NewsContext } from "../../contexts/NewsContext";
import "./NewsCard.scss";
import NoResults from "../NoResults/NoResults";
import MainApi from "../../utils/MainApi";

function NewsCard(props) {
  const news = React.useContext(NewsContext);
  const [cardsDisplayed, setCardsDisplayed] = React.useState(3);

  React.useEffect(() => {
    setCardsDisplayed(3);
  }, [news]);

  function handleViewMoreClick() {
    setCardsDisplayed((prev) => prev + 3);
  }

  if (!news || news.length === 0) {
    return <NoResults />;
  }

  return (
    <>
      <h2 className="cards-section-title">Resultados de la búsqueda</h2>
      <div className="cards-container">
        {news.slice(0, cardsDisplayed).map((article) => (
          <Card
            title={article.title}
            urlToImage={article.urlToImage}
            url={article.url}
            publishedAt={article.publishedAt}
            content={article.content}
            source={article.source.name}
            keyword={article.keyword}
            key={article.url || article.title}
            isLoggedIn={props.isLoggedIn}
          />
        ))}
        {cardsDisplayed < news.length ? (
          <div className="cards-container__view-more-container">
            <button
              type="button"
              className="cards-container__view-more"
              onClick={handleViewMoreClick}
            >
              Ver más
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

function Card(props) {
  const [isSaved, setIsSaved] = React.useState(false);
  const [savedId, setSavedId] = React.useState(null);

  const cardSaveButtonClassName = `card__save-button ${
    isSaved ? "card__save-button_saved" : ""
  } `;

  function handleSaveClick() {
    if (!props.isLoggedIn) {
      return;
    }

    const jwt = localStorage.getItem("jwt");

    if (isSaved) {
      const resolveId = savedId
        ? Promise.resolve(savedId)
        : MainApi.getSavedArticles(jwt).then((articles) => {
            const match = (Array.isArray(articles) ? articles : []).find(
              (article) => article.title === props.title
            );
            return match && match._id;
          });

      resolveId
        .then((id) => {
          if (!id) {
            setIsSaved(false);
            return null;
          }
          return MainApi.deleteArticle(jwt, id);
        })
        .then((deleted) => {
          if (deleted !== null) {
            setIsSaved(false);
            setSavedId(null);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      return;
    }

    const articleData = {
      keyword: props.keyword,
      title: props.title,
      text: props.content || props.title || "Sin descripción",
      date: props.publishedAt,
      source: props.source,
      link: props.url,
      image: props.urlToImage || props.url,
    };

    MainApi.compareArticles(jwt, props.title)
      .then((res) => {
        if (res && res.message === "Article found") {
          setIsSaved(true);
          return null;
        }
        return MainApi.saveArticle(jwt, articleData);
      })
      .then((saved) => {
        if (saved && saved._id) {
          setSavedId(saved._id);
          setIsSaved(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function showTooltip(cardElement) {
    const tooltip = cardElement.querySelector(".card__hover-text");
    if (tooltip) {
      tooltip.classList.toggle("card__hover-text_active");
    }
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
    >
      <button
        type="button"
        className={cardSaveButtonClassName}
        onClick={handleSaveClick}
        aria-label={isSaved ? "Eliminar de guardados" : "Guardar artículo"}
      />
      <button type="button" className="card__keyword-button">
        {props.keyword}
      </button>
      {props.isLoggedIn ? null : (
        <button type="button" className="card__hover-text">
          Inicia sesión para guardar artículos
        </button>
      )}
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

export default NewsCard;
