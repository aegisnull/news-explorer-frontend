import React from "react";
import "./Main.scss";
import Header from "../Header/Header";

function Main() {
  return (
    <section className="main">
      <Header />
      <div className="main__container">
        <h1 className="main__title">¿Qué está pasando en el mundo?</h1>
        <p className="main__subtitle">
          Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu
          cuenta personal.
        </p>
      </div>
    </section>
  );
}

export default Main;
