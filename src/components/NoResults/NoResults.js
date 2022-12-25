import React from "react";
import "./NoResults.scss";

function NoResults() {
  return (
    <div className="no-results">
      <div className="no-results__icon" />
      <h2 className="no-results__title">No se encontró nada</h2>
      <p className="no-results__subtitle">
        Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda.
      </p>
    </div>
  );
}

export default NoResults;
