import React from "react";
import "./Main.scss";
import Header from "../Header/Header";
import About from "../About/About";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import { NewsContext } from "../../contexts/NewsContext";
import getNews from "../../utils/NewsApi";

function Main(props) {
  const [isSearching, setIsSearching] = React.useState(false);
  const [news, setNews] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  function handleSearchSubmit() {
    setIsSearching(true);
    getNewsObject();
  }

  function getNewsObject() {
    setIsLoading(true);
    getNews(searchInput)
      .then((res) => {
        const newsWithQuery = res.map((item) => ({
          ...item,
          keyword: searchInput,
        }));
        setNews(newsWithQuery);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <section className="main">
        <Header
          onSignInClick={props.onSignInClick}
          isLoggedIn={props.isLoggedIn}
          letLogOut={props.letLogOut}
        />
        <div className="main__container">
          <h1 className="main__title">¿Qué está pasando en el mundo?</h1>
          <p className="main__subtitle">
            Encuentra las últimas noticias sobre cualquier tema y guárdalas en
            tu cuenta personal.
          </p>
          <SearchForm
            onSearch={handleSearchSubmit}
            setSearchInput={setSearchInput}
          />
        </div>
      </section>
      <NewsContext.Provider value={news}>
        {isSearching ? (
          <NewsCardList isLoading={isLoading} isLoggedIn={props.isLoggedIn} />
        ) : (
          ""
        )}
      </NewsContext.Provider>
      <About />
      <Footer />
    </>
  );
}

export default Main;
