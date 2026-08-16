"use client";

import React from "react";
import "./SavedNews.scss";
import Header from "../Header/Header";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import Footer from "../Footer/Footer";
import MainApi from "../../utils/MainApi";
import { NewsContext } from "../../contexts/NewsContext";

function SavedNews() {
  const [savedNews, setSavedNews] = React.useState([]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return undefined;
    }

    MainApi.getSavedArticles(jwt)
      .then((res) => {
        setSavedNews(Array.isArray(res) ? res : []);
      })
      .catch((err) => {
        console.error(err);
        setSavedNews([]);
      });
    return undefined;
  }, []);

  function handleDeleteArticle(id) {
    const jwt = localStorage.getItem("jwt");
    return MainApi.deleteArticle(jwt, id)
      .then(() => {
        setSavedNews((articles) =>
          articles.filter((article) => article._id !== id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <section className="saved-news">
      <Header />
      <NewsContext.Provider value={savedNews}>
        <SavedNewsHeader />
        <section className="news__container">
          <NewsCardList onDeleteArticle={handleDeleteArticle} />
        </section>
      </NewsContext.Provider>
      <Footer />
    </section>
  );
}

export default SavedNews;
