import React from "react";
import "./About.scss";
import Avatar from "../../images/avatar.webp";

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <img className="about__avatar" src={Avatar} alt="Avatar" />
        <div className="about__info">
          <h1 className="about__title">Acerca del autor</h1>
          <p className="about__text">
            Mi nombre es <strong>Luis Tellez</strong>, soy desarrollador web
            Full Stack (MERN) y me dedico a la creación de sitios web y
            aplicaciones web. Conocimientos en HTML, CSS, JavaScript, React,
            Node.js, Express, MongoDB, MySQL, Git, GitHub, Bootstrap, Material
            UI, entre otras tecnologías.
          </p>
          <p className="about__text">
            Mi experiencia en Practicum fue muy buena, aprendí mucho y me ayudó
            a mejorar mis habilidades como desarrollador web.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
