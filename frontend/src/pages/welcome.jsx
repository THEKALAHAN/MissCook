import React from 'react'
import "../styles/welcome.css";
import { useNavigate } from "react-router-dom";
import MisscookIcon from "../assets/MisscookOff.png";
import { Link } from "react-router-dom";
import { TbSend2 } from "react-icons/tb";

export function Welcome() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="welcome-body">
      <div className="content">
        <div className="welcome-icon-container">
          <img src={MisscookIcon} className="welcome-icon" alt="Cooking Icon" />
        </div>
        <div className="welcome-title">Generador de recetas AI</div>

        <div className="welcome-text">La mejor IA de Cocina. Introduce ingredientes y obtén recetas con nuestra IA de recetas.</div>
        <div className="welcome-example">Por ejemplo; desayuno con huevos y tomate</div>
        <button onClick={goToLogin} className="welcome-button">
          Empezar
        </button>
      </div>
    </div>
  );
}
