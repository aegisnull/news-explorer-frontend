import React from "react";
import "./SearchForm.scss";

function SearchForm() {
  return (
    <form className="search-form">
      <input
        type="text"
        className="search-form__input"
        placeholder="Introduce un tema"
      />
      <button className="search-form__button">Buscar</button>
    </form>
  );
}

export default SearchForm;
