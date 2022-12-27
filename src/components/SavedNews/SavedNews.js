import React from "react";
import "./SavedNews.scss";
import Header from "../Header/Header";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import Footer from "../Footer/Footer";

function SavedNews(props) {
  return (
    <section className="saved-news">
      <Header onSignInClick={props.onSignInClick} />
      <SavedNewsHeader />
      <section className="news__container">
        <NewsCardList />
      </section>
      <Footer />
    </section>
  );
}

export default SavedNews;
