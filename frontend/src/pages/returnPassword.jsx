import MisscookIcon from "../assets/MisscookOff.png";
import "../styles/returnPassword.css";
import "../styles/login.css";
import React, {useState} from "react";
import { TbSend2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";


export function ReturnPassword() {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
   const navigate = useNavigate();
 


  const handleSubmit = async (e) => {e.preventDefault();


    try {
      const response = await fetch("http://127.0.0.1:8000/recuperar_contra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });


      if (response.ok) {
        setMensaje("Código enviado al correo ");
      } else {
        setMensaje("Error al enviar el código");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión con el servidor");
    }
  };


  const handleVerificacion = async (e) => { e.preventDefault();


    try {
      const response = await fetch("http://127.0.0.1:8000/verificar_codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, codigo }),
      });


      if (response.ok) {
        setMensaje("Código verificado correctamente");
        // Redirigir a NewPassword
        navigate("/newpassword", { state: { email } });
      } else {
        const errorData = await response.json();
        setMensaje(errorData.detail || "Código incorrecto o expirado");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión con el servidor");
    }
  };


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


        <form onSubmit={handleSubmit}  action="">
          <div className="return-container">
            <input className="return-input-box" type="email" placeholder="Ingresa tu email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
            <button className="return-button" type="submit">
              Enviar
            </button>
          </div>
        </form>
        <br />
        {mensaje && <p>{mensaje}</p>}


        <div className="login-title">Copia el codigo de seguridad </div>
        <form action="" onSubmit={handleVerificacion}>
          <div className="return-container">
            <input type="number" placeholder="0000" className="return-input-box" value={codigo}  onChange={(e)=> setCodigo(e.target.value)} />
            <button className="return-button" type="submit">
              <TbSend2 className="return-icon-button" size={"1.3rem"} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
