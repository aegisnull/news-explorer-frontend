import React from "react";
import { NewsContext } from "../../contexts/NewsContext";
import "./NewsCard.scss";
import NoResults from "../NoResults/NoResults";

function NewsCard(props) {
  const news = React.useContext(NewsContext);

  const [currentPage, setCurrentPage] = React.useState(1);
  const cardsPerPage = 6;
  const maxPage = Math.ceil(news.length / cardsPerPage);

  const handleNextPage = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (news.length === 0) {
    return <NoResults />;
  }

  return (
    <>
      <h1 className="cards-section-title">Resultados de la búsqueda</h1>
      <div className="cards-container">
        {news
          .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
          .map((news) => (
            <Card
              title={news.title}
              urlToImage={news.urlToImage}
              url={news.url}
              publishedAt={news.publishedAt}
              content={news.content}
              source={news.source.name}
              key={news.id}
              isLoggedIn={props.isLoggedIn}
            />
          ))}
        <div className="cards-container__view-more-container">
          {currentPage > 1 ? (
            <button
              className="cards-container__view-more"
              onClick={handlePrevPage}
            >
              Ver anteriores
            </button>
          ) : null}
          {currentPage < maxPage ? (
            <button
              className="cards-container__view-more"
              onClick={handleNextPage}
            >
              Ver más
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

function Card(props) {
  const cardRef = React.useRef(null);

  function showTooltip(cardElement) {
    const tooltip = cardElement.querySelector(".card__hover-text");
    tooltip.classList.toggle("card__hover-text_active");
  }

  const handleCardHover = (event) => {
    showTooltip(event.currentTarget);
  };

  return (
    <article
      className="card"
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardHover}
      ref={cardRef}
    >
      <button className="card__save-button" />
      <button className="card__keyword-button"></button>
      {props.isLoggedIn ? (
        ""
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
