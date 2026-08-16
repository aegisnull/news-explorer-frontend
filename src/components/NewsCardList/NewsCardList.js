"use client";

import React from "react";
import "./NewsCardList.scss";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";
import SavedCards from "../NewsCard/SavedCards";
import { usePathname } from "next/navigation";

function NewsCardList(props) {
  const currentPath = usePathname();
  const cardComponent =
    currentPath === "/saved-news" ? (
      <SavedCards onDeleteArticle={props.onDeleteArticle} />
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
