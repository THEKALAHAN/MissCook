import React from 'react';
import '../styles/welcome.css';
import MisscookIcon from '../assets/MisscookOff.png';

export function Welcome() {
  return (
    <div className="content">
        <div className="welcome-icon-container">
            <img src={MisscookIcon} className='welcome-icon' alt="Cooking Icon" />
        </div>
        <div className='welcome-title'>Generador de recetas AI</div>
        <div className='welcome-text'>La mejor IA de Cocina. Introduce ingredientes y obtén recetas con nuestra IA de recetas.</div>
        <div className="welcome-example">
            Por ejemplo; desayuno con huevos y tomate
        </div>
        <button className='welcome-button'>Empezar</button>
    </div>
  );
}