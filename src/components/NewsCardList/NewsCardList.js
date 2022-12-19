import React from "react";
import "./NewsCardList.scss";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList() {
  return (
    <section className="news-card-list">
      <Preloader />
      <NewsCard />
    </section>
  );
}

export default NewsCardList;
