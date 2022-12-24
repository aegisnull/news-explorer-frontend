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

  function handleSearchSubmit() {
    setIsSearching(true);
    getNewsObject();
  }

  function getNewsObject() {
    getNews(searchInput).then((res) => {
      setNews(res);
    });
  }

  return (
    <>
      <section className="main">
        <Header onSignInClick={props.onSignInClick} />
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
        {isSearching ? <NewsCardList /> : ""}
      </NewsContext.Provider>
      <About />
      <Footer />
    </>
  );
}

export default Main;
