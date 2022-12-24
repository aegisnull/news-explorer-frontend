import React from "react";
import "./SearchForm.scss";
import NewsCard from "../NewsCard/NewsCard";

/* function getNewsObject(searchInput) {
  getNews(searchInput).then((articles) => {
    return articles;
  });
} */

function SearchForm(props) {
  const [searchInput, setSearchInput] = React.useState("");

  function handleSearchInput(e) {
    setSearchInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSearch();
    // getNewsObject(searchInput);
  }

  <NewsCard formValue={searchInput} />;

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        placeholder="Introduce un tema"
        onChange={handleSearchInput}
      />
      <button className="search-form__button">Buscar</button>
    </form>
  );
}

export default SearchForm;
