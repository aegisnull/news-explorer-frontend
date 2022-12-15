import React from "react";
import "./About.scss";

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <img
          className="about__avatar"
          src="https://avatars.githubusercontent.com/u/27663011?v=4"
          alt="Avatar"
        />
        <div className="about__info">
          <h1 className="about__title">Acerca del autor</h1>
          <p className="about__text">
            Este bloque describe al autor del proyecto. Aquí debe indicar tu
            nombre, a qué te dedicas y qué tecnologías de desarrollo conoces.
          </p>
          <p className="about__text">
            También puedes hablar de tu experiencia con Practicum, de lo que
            aprendiste allí y de cómo puedes ayudar a los clientes potenciales.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
