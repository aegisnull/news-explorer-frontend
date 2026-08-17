"use client";

import React from "react";
import "./SearchForm.scss";

function SearchForm(props) {
  const [keyword, setKeyword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      return;
    }
    props.onSearch(trimmedKeyword);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        placeholder="Introduce un tema"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
        minLength={2}
      />
      <button className="search-form__button" type="submit">
        Buscar
      </button>
    </form>
  );
}

export default SearchForm;
