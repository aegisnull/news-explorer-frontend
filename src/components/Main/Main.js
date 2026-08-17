"use client";

import React from "react";
import "./Main.scss";
import Header from "../Header/Header";
import About from "../About/About";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import { NewsContext } from "../../contexts/NewsContext";
import { useAuth } from "../../contexts/AuthContext";
import getNews from "../../utils/NewsApi";

function Main() {
  const { isLoggedIn } = useAuth();
  const [isSearching, setIsSearching] = React.useState(false);
  const [news, setNews] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  function handleSearchSubmit(keyword) {
    setIsSearching(true);
    setIsLoading(true);
    getNews(keyword)
      .then((res) => {
        const articles = Array.isArray(res) ? res : [];
        setNews(
          articles.map((item) => ({
            ...item,
            keyword,
          }))
        );
      })
      .catch((err) => {
        console.error(err);
        setNews([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <section className="main">
        <Header />
        <div className="main__container">
          <h1 className="main__title">¿Qué está pasando en el mundo?</h1>
          <p className="main__subtitle">
            Encuentra las últimas noticias sobre cualquier tema y guárdalas en
            tu cuenta personal.
          </p>
          <SearchForm onSearch={handleSearchSubmit} />
        </div>
      </section>
      <NewsContext.Provider value={news}>
        {isSearching ? (
          <NewsCardList isLoading={isLoading} isLoggedIn={isLoggedIn} />
        ) : null}
      </NewsContext.Provider>
      <About />
      <Footer />
    </>
  );
}

export default Main;
