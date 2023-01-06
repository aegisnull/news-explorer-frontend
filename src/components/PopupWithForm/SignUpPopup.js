import React from "react";
import PopupWithForm from "./PopupWithForm";

import "./PopupWithForm.scss";

function SignUpPopup(props) {
  const [inputs, setInputs] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(
      inputs.email,
      inputs.password,
      inputs.username
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
          value={inputs.email || ""}
          onChange={handleInputChange}
          required
        />
        <span className="popup__input-error" />
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
        <span className="popup__input-error" />
      </label>
      <label className="popup__label">
        Nombre de usuario
        <input
          className="popup__input"
          type="text"
          name="username"
          placeholder="Introduce tu nombre de usuario"
          value={inputs.username || ""}
          onChange={handleInputChange}
          required
        />
        <span className="popup__input-error" />
      </label>
    </PopupWithForm>
  );
}

export default SignUpPopup;
