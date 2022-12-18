import React from "react";
import "./Preloader.scss";

function Preloader() {
  return (
    <div className="preloader">
      <i class="preloader__circle" />
      <div className="preloader__text">Buscando noticias...</div>
    </div>
  );
}

export default Preloader;
