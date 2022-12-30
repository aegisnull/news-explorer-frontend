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
          onClick={props.onClose}
        ></button>

        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__submit-button" type="submit">
            {props.buttonText}
          </button>
        </form>
        <button className="popup__link" onClick={props.onRegister}>
          o <span className="popup__blue">inscribirse</span>
        </button>
      </div>
    </div>
  );
}

export default PopupWithForm;
