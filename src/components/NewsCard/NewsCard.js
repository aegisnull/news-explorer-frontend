import React from "react";
import "./NewsCard.scss";

function NewsCard() {
  return (
    <article className="card">
      <button className="card__save-button" />
      <button className="card__trash-button" />
      <button className="card__keyword-button"></button>

      <a href="#" target="_blank" className="card__link">
        <img className="card__image" src="#" alt="" />
        <p className="card__date"></p>
        <h3 className="card__title"></h3>
        <p className="card__text"></p>
        <p className="card__pusblisher"></p>
      </a>
    </article>
  );
}

export default NewsCard;
