import MisscookIcon from "../assets/MisscookOff.png";
import "../styles/login.css";
import React from "react";
import { Link } from "react-router-dom";
import { TbSend2 } from "react-icons/tb";

export function Login() {
  return (
    <div className="login-body">
      <div className="return-botton">
        <Link to="/">
            <TbSend2 size="2rem" className="return-icon" />
        </Link>
      </div>
      <div className="login-content">
        <div className="login-icon">
          <img src={MisscookIcon} className="welcome-icon" alt="Cooking Icon" />
        </div>
        <div>
          <form action="">
            <input type="text" placeholder="Ingresa tu email" className="login-input-box login-title" />
            <br />
            <input type="password" placeholder="Ingresa tu contraseña" className="login-input-box login-title" />
            <br />
            <Link to="/register" className="login-links">
              ¿Es tu primera vez? Registrate
            </Link>
            <br />
            <Link to="/returnPassword" className="login-links">
              ¿Has olvidado tu contraseña?
            </Link>
            <br />
            <button type="submit" className="login-button">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
