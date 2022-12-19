import React from "react";
import "./NewsCardList.scss";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList(props) {
  return (
    <section className="news-card-list">
      {props.NewsCard ? <Preloader /> : <NewsCard />}
    </section>
  );
}

export default NewsCardList;
