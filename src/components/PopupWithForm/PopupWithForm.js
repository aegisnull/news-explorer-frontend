"use client";

import React from "react";
import "./PopupWithForm.scss";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup-${props.name} ${
        props.isOpen ? "popup_active" : ""
      }`}
    >
      <div
        className={`popup__container ${
          props.isRegisterOpen ? "popup__container_register" : ""
        }`}
      >
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
          aria-label="Cerrar"
        ></button>

        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          {props.error ? (
            <span className="popup__input-error">{props.error}</span>
          ) : null}
          <button className="popup__submit-button" type="submit">
            {props.buttonText}
          </button>
        </form>
        {props.onRedirect ? (
          <button
            className="popup__link"
            type="button"
            onClick={props.onRedirect}
          >
            o <span className="popup__blue">{props.redirectText}</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default PopupWithForm;
