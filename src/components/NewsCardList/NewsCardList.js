import React from "react";
import "./NewsCardList.scss";
import Preloader from "../Preloader/Preloader";
import SavedCards from "../NewsCard/SavedCards";

function NewsCardList(props) {
  return (
    <section className="news-card-list">
      {props.NewsCard ? <Preloader /> : <SavedCards />}
    </section>
  );
}

export default NewsCardList;
