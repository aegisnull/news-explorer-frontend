import React from "react";
import "./SavedNews.scss";
import Header from "../Header/Header";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import Footer from "../Footer/Footer";
import MainApi from "../../utils/MainApi";
import { NewsContext } from "../../contexts/NewsContext";

function SavedNews(props) {
  const [savedNews, setSavedNews] = React.useState([]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    getSavedArticles(jwt);
  }, []);

  function getSavedArticles(jwt) {
    MainApi.getSavedArticles(jwt)
      .then((res) => {
        setSavedNews(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="saved-news">
      <Header
        onSignInClick={props.onSignInClick}
        isLoggedIn={props.isLoggedIn}
        letLogOut={props.letLogOut}
      />
      <NewsContext.Provider value={savedNews}>
        <SavedNewsHeader />
        <section className="news__container">
          <NewsCardList />
        </section>
      </NewsContext.Provider>
      <Footer />
    </section>
  );
}

export default SavedNews;
