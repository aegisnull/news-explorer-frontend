import React from "react";

function SuccessPopup(props) {
  function handleLinkClick() {
    if (props.isSuccess) {
      props.openSignIn();
    } else {
      props.openSignUp();
    }
  }

  return (
    <div
      className={`popup popup_success ${props.isOpen ? "popup_active" : ""}`}
    >
      <div className="popup__container popup__container_success">
        <h2 className="popup__title popup__title_success">
          {props.isSuccess
            ? "¡El registro se ha completado con éxito!"
            : "Ooops, algo salió mal"}
        </h2>
        <button
          type="button"
          onClick={handleLinkClick}
          className="popup__label popup__label_success popup__link"
        >
          {props.isSuccess ? "Iniciar sesión" : "Intentar de nuevo"}
        </button>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Cerrar"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default SuccessPopup;
