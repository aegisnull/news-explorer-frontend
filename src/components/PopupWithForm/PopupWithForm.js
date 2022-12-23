import React from "react";
import "./PopupWithForm.scss";
import { Link } from "react-router-dom";

function PopupWithForm(props) {
  return (
    <div
      className=/* {`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`} */"popup"
    >
      <div className="popup__container">
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
        <Link className='popup__link' to='/signup'>
          o <span className="popup__blue">inscribirse</span>
        </Link>
      </div>
    </div>
  );
}

export default PopupWithForm;
