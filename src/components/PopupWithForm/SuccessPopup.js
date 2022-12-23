import React from "react";

function SuccessPopup(props) {
  return (
    <div
      className={`popup popup_success ${props.isOpen ? "popup_active" : ""}`}
    >
      <div className="popup__container popup__container_success">
        <h2 className="popup__title popup__title_success">
          ¡El registro se ha completado con éxito!
        </h2>
        <label className="popup__label popup__label_success">Inscribirse</label>
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
