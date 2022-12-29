import React from "react";
import PopupWithForm from "./PopupWithForm";

import "./PopupWithForm.scss";

function SignUpPopup(props) {
  const [inputs, setInputs] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    props.onSuccess();
    props.onSubmit({
      email: inputs.email,
      password: inputs.password,
    });
  }

  function handleInputChange(evt) {
    setInputs({
      ...inputs,
      [evt.target.name]: evt.target.value,
    });
  }

  return (
    <PopupWithForm
      name="sign-up"
      title="Inscribirse"
      buttonText="Inscribirse"
      isOpen={props.isOpen}
      onClose={props.onClose}
      isRegisterOpen={props.isRegisterOpen}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        Correo electrónico
        <input
          className="popup__input"
          type="email"
          name="email"
          placeholder="Introduce tu correo electrónico"
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
          onChange={handleInputChange}
          required
        />
        <span className="popup__input-error"></span>
      </label>
      <label className="popup__label">
        Nombre de usuario
        <input
          className="popup__input"
          type="text"
          name="username"
          placeholder="Introduce tu nombre de usuario"
          onChange={handleInputChange}
          required
        />
        <span className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default SignUpPopup;
