import React, { useState, useEffect } from 'react';
  import '../styles/welcome.css';
  import MisscookIcon from '../assets/MisscookOff.png';

  export function Welcome() {
    const [apiMessage, setApiMessage] = useState('Cargando mensaje del servidor...');

    useEffect(() => {
      fetch('http://127.0.0.1:8000/') 
        .then(response => response.json())
        .then(data => setApiMessage(data.mensaje)) 
        .catch(error => {
          console.error("Error al conectar:", error);
          setApiMessage("Error al conectar con el servidor.");
        });
    }, []); 

    return (
      <div className="content">
          <div className="welcome-icon-container">
              <img src={MisscookIcon} className='welcome-icon' alt="Cooking Icon" />
          </div>
          <div className='welcome-title'>Generador de recetas AI</div>

          
          <div className='welcome-text'>{apiMessage}</div>
          
          <div className="welcome-example">
              Por ejemplo; desayuno con huevos y tomate
          </div>
          <button className='welcome-button'>Empezar</button>
      </div>
    );
  }