import MisscookIcon from "../assets/MisscookOff.png";
import "../styles/login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbSend2 } from "react-icons/tb";

export function Register() {
  const [nombre_usuario, setNombreUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // 🧠 VALIDACIONES ANTES DE ENVIAR AL BACKEND
    if (!nombre_usuario || !correo || !contrasena || !confirmarContrasena) {
      alert("⚠️ Todos los campos son obligatorios.");
      return;
    }

    if (contrasena.length < 8) {
      alert("❌ La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (contrasena.length > 16) {
      alert("❌ La contraseña no puede tener más de 16 caracteres.");
      return;
    }

    if (contrasena !== confirmarContrasena) {
      alert("❌ Las contraseñas no coinciden.");
      return;
    }
    console.log("📩 Enviando contraseña:", contrasena);

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Campos que vienen directamente del formulario
          nombre_usuario,
          correo,
          contrasena,
          
          // Campo token (requerido por schemas.py)
          token: "TEMP_DEFAULT_TOKEN", 

          // ✅ CORRECCIÓN CLAVE: Enviamos los campos opcionales como null para evitar el 400
          nacionalidad: null, 
          edad: null,
          peso: null,
          altura: null,
        }),
      });

      if (!response.ok) {
        // Manejo de errores detallado desde FastAPI
        const errorData = await response.json();
        alert("Error de registro: " + (errorData.detail || "Error desconocido."));
        console.error("Error detalle del backend:", errorData);
        return;
      }

      // ✅ Mensaje de verificación de correo
      const data = await response.json();
      console.log("Respuesta backend:", data);

      alert(
        "🎉 ¡Registro exitoso! Por favor, revisa tu correo electrónico para verificar tu cuenta antes de iniciar sesión."
      );
      
      navigate("/login"); 

    } catch (error) {
      console.error("Error de conexión al servidor:", error);
      alert("❌ Error de conexión al servidor. Inténtalo más tarde.");
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
          <img className="login-icon" src={MisscookIcon} alt="Misscook-icon" />
        </div>
        <div className="login-title">REGÍSTRATE</div>
        <div>
          <form onSubmit={handleRegister} className="login-form">
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              className="login-input-box"
              value={nombre_usuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
            />
            <br />
            <input
              type="email"
              placeholder="Ingresa tu email"
              className="login-input-box"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="login-input-box"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Confirma tu contraseña"
              className="login-input-box"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
            />
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