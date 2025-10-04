import MisscookIcon from "../assets/MisscookOff.png";
import "../styles/login.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbSend2 } from "react-icons/tb";
import { useState } from "react";

export function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Error: " + JSON.stringify(errorData));
        return;
      }

      const data = await response.json();

      localStorage.setItem("usuario", data.usuario);

      navigate("/chat");
    } catch (error) {
      console.error("Error en login:", error);
      alert("Ocurrió un error en el servidor");
    }
  };

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
          <form onSubmit={handleSubmit} className="login-form">
            <input type="text" placeholder="Ingresa tu email" className="login-input-box login-title" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            <br />
            <input type="password" placeholder="Ingresa tu contraseña" className="login-input-box login-title" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
            <br />
            <Link to="/register" className="login-links">
              ¿Es tu primera vez? Regístrate
            </Link>
            <br />
            {/* <Link to="/returnPassword" className="login-links">
              ¿Has olvidado tu contraseña?
            </Link> */}
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
