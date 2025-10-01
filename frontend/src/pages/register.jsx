import MisscookIcon from "../assets/MisscookOff.png";
import "../styles/login.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbSend2 } from "react-icons/tb";
import { useState } from "react";

export function Register() {
  const [nombre_usuario , setNombreUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario : 2,
          token: "abcasd12432323",
          nombre_usuario ,
          correo,
          contrasena,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Error: " + errorData.detail);
        console.log("Error detalle:", errorData);
        return;
      }

      const data = await response.json();
      alert("Usuario registrado con éxito");
      console.log("Respuesta backend:", data);
      navigate("/login");
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Error en el servidor");
    }
  };

  return (
    <div className="login-body">
      <div className="return-botton">
        <Link to="/login">
          <TbSend2 size="2rem" className="return-icon" />
        </Link>
      </div>
      <div className="login-content">
        <div>
          {" "}
          <img className="login-icon" src={MisscookIcon} alt="Misscook-icon" />
        </div>
        <div className="login-title ">REGISTRATE</div>
        <div>
          <form onSubmit={handleRegister} className="login-form">
            <input type="text" placeholder="Ingresa tu nombre" className="login-input-box" value={nombre_usuario } onChange={(e) => setNombreUsuario(e.target.value)} />
            <br />
            <input type="text" placeholder="Ingresa tu email" className="login-input-box" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            <br />

            <input type="password" placeholder="Ingresa tu contraseña" className="login-input-box" value={contrasena} onChange={(e) => setContrasena(e.target.value)}/>
            <br />
            <input type="password" placeholder="Confirma tu contraseña" className="login-input-box" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)}/>
            <br />

            <button className="login-button" type="submit">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
