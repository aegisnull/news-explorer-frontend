import React from "react";

function SuccessPopup(props) {
  function handleLinkClick() {
    props.onClose();
    props.isSignInPopupOpen(true);
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
        <label
          onClick={handleLinkClick}
          className="popup__label popup__label_success"
        >
          Inscribirse
        </label>
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default SuccessPopup;
