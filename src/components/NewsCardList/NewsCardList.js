import React from "react";
import "./NewsCardList.scss";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";
import SavedCards from "../NewsCard/SavedCards";
import { useLocation } from "react-router-dom";

function NewsCardList(props) {
  const currentPath = useLocation().pathname;
  const cardComponent =
    currentPath === "/saved-news" ? (
      <SavedCards />
    ) : (
      <NewsCard isLoggedIn={props.isLoggedIn} />
    );

  return (
    <section className="news-card-list">
      {props.isLoading ? <Preloader /> : cardComponent}
    </section>
  );
}

export default NewsCardList;
