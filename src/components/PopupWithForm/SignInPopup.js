import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

import "./PopupWithForm.scss";

function SignInPopup(props) {
  return (
    <PopupWithForm
      name="sign-in"
      title="Iniciar sesión"
      buttonText="Iniciar sesión"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <label className="popup__label">
        Correo electrónico
        <input
          className="popup__input"
          type="email"
          name="email"
          placeholder="Introduce tu correo electrónico"
          required
        />
        <span className="popup__input-error"></span>
      </label>
      <label className="popup__label">
        Contraseña
        <input
          className="popup__input"
          type="password"
          name="password"
          placeholder="Introduce tu contraseña"
          required
        />
        <span className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default SignInPopup;
