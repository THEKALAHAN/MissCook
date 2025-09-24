import MisscookIcon from "../assets/MisscookOff.png";
import "../styles/returnPassword.css";
import "../styles/login.css";
import React from "react";
import { TbSend2 } from "react-icons/tb";
import { Link } from "react-router-dom";

export function ReturnPassword() {
  return (
    <div className="return-body">
      <div className="return-botton">
        <Link to="/login">
            <TbSend2 size="2rem" className="return-icon" />
        </Link>
      </div>
      <div className="login-content">
        <div>
          <img className="login-icon" src={MisscookIcon} alt="Misscook-icon" />
        </div>

        <div className="return-title">Recupera tu contraseña</div>
        <div className="login-title">Para poder recuperar tu contraseña es necesario ingresar tu correo</div>

        <form action="">
          <div className="return-container">
            <input className="return-input-box" type="text" placeholder="Ingresa tu email" />
            <button className="return-button" type="submit">
              Enviar
            </button>
          </div>
        </form>
        <br />

        <div className="login-title">Copia el codigo de seguridad </div>
        <form action="">
          <div className="return-container">
            <input type="number" placeholder="0000" className="return-input-box" />
            <button className="return-button" type="submit">
              <TbSend2 className="return-icon-button" size={"1.3rem"} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
