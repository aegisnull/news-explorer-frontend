import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

import "./PopupWithForm.scss";

function SignInPopup(isOpen, onClose) {
  return (
    <PopupWithForm
      name="sign-in"
      title="Iniciar sesión"
      buttonText="Iniciar sesión"
    >
      <label className="popup__label">
        <input
          className="popup__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <span className="popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input"
          type="password"
          name="password"
          placeholder="Contraseña"
          required
        />
        <span className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default SignInPopup;
