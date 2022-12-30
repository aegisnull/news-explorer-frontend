import React from "react";
import "./NewsCard.scss";
import SampleNews from "../../utils/SampleNews";

function SavedCards() {
  return (
    <>
      <div className="cards-container cards-container_saved">
        {SampleNews.map((news) => (
          <Card
            key={news.id}
            url={news.url}
            urlToImage={news.urlToImage}
            publishedAt={news.publishedAt}
            title={news.title}
            content={news.content}
            source={news.source}
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
          <p className="card__date">{props.publishedAt}</p>
          <h3 className="card__title">{props.title}</h3>
          <p className="card__text">{props.content}</p>
          <p className="card__publisher">{props.source}</p>
        </div>
      </a>
    </article>
  );
}

export default SavedCards;
