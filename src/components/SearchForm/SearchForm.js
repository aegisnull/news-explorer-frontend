import React from "react";
import "./SearchForm.scss";

function SearchForm(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onSearch();
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        placeholder="Introduce un tema"
        onChange={(e) => props.setSearchInput(e.target.value)}
      />
      <button className="search-form__button">Buscar</button>
    </form>
  );
}

export default SearchForm;
