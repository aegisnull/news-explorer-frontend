import React from "react";
import "./NewsCard.scss";
//import SampleNews from "../../utils/SampleNews";
import { NewsContext } from "../../contexts/NewsContext";

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
            key={index}
          />
        ))}
      </div>
    </>
  );
}

function Card(props) {
  return (
    <article className="card">
      <button className="card__trash-button" />
      <button className="card__keyword-button"></button>
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
