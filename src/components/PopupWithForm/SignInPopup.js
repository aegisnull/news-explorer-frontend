import React from "react";
import PopupWithForm from "./PopupWithForm";

import "./PopupWithForm.scss";

function SignInPopup(props) {
  const [inputs, setInputs] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(
      inputs.email,
      inputs.password
    );
    setInputs({});
  }

  function handleInputChange(evt) {
    setInputs({
      ...inputs,
      [evt.target.name]: evt.target.value,
    });
  }

  return (
    <PopupWithForm
      name="sign-in"
      title="Iniciar sesión"
      buttonText="Iniciar sesión"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onRegister={props.onRegister}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        Correo electrónico
        <input
          className="popup__input"
          type="email"
          name="email"
          placeholder="Introduce tu correo electrónico"
          value={inputs.email || ""}
          onChange={handleInputChange}
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
          value={inputs.password || ""}
          onChange={handleInputChange}
          required
        />
        <span className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default SignInPopup;
