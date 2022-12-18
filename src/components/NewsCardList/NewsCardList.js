import React from "react";
import "./NewsCardList.scss";
import Preloader from "../Preloader/Preloader";

function NewsCardList() {
  return (
    <section className="news-card-list">
      <Preloader />
    </section>
  );
}

export default NewsCardList;
