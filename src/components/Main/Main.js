import React from "react";
import SearchForm from "../SearchForm/SearchForm";

function Main() {
  return (
    <section className="main">
      <h1 className="main__title">¿Qué está pasando en el mundo?</h1>
      <p className="main__subtitle">
        Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu
        cuenta personal.
      </p>
      <SearchForm />
    </section>
  );
}

export default Main;
